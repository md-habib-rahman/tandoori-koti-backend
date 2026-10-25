// controllers/deliveryReportController.js
import prisma from "../config/db.js"; // ADJUST: wherever your PrismaClient instance is exported
import {
  addDaysIso,
  helsinkiDateKey,
  helsinkiDayStartUtc,
} from "../utils/helsinkiTime.js";

const MAX_DAYS = 366;
const MAX_ORDERS = 10000;

const isIsoDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
const toCents = (value) => Math.round(Number(value || 0) * 100);
const euros = (cents) => Math.round(cents) / 100;
const round1 = (n) => Math.round(n * 10) / 10;

// GET /api/delivery/admin/report?from=2026-10-11&to=2026-10-17
// Orders PLACED on those days (Finnish calendar), both days included.
// Revenue means cash collected: the total of orders that were delivered.
export const getDeliveryReport = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!isIsoDate(from) || !isIsoDate(to)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Use dates like 2026-10-17 for from and to.",
        });
    }
    if (from > to) {
      return res
        .status(400)
        .json({
          success: false,
          message: "The start date must not be after the end date.",
        });
    }
    const days =
      (Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) /
        86400000 +
      1;
    if (days > MAX_DAYS) {
      return res
        .status(400)
        .json({
          success: false,
          message: `Choose a range of at most ${MAX_DAYS} days.`,
        });
    }

    const start = helsinkiDayStartUtc(from);
    const end = helsinkiDayStartUtc(addDaysIso(to, 1)); // start of the day after `to`

    const orders = await prisma.deliveryOrder.findMany({
      where: { createdAt: { gte: start, lt: end } },
      include: { items: true },
      orderBy: { createdAt: "asc" },
      take: MAX_ORDERS,
    });

    const summary = {
      totalOrders: orders.length,
      delivered: 0,
      cancelled: 0,
      inProgress: 0,
      revenueCents: 0, // everything collected: food + delivery fees
      deliveryFeesCents: 0, // the part of revenueCents that is delivery fees
      cancelledValueCents: 0,
    };
    let minutesTotal = 0;
    let minutesCount = 0;

    const byMedium = new Map();
    const byDay = new Map();
    const dishes = new Map();

    for (const order of orders) {
      const dayKey = helsinkiDateKey(order.createdAt);
      if (!byDay.has(dayKey)) {
        byDay.set(dayKey, {
          date: dayKey,
          orders: 0,
          delivered: 0,
          revenueCents: 0,
          feesCents: 0,
        });
      }
      const day = byDay.get(dayKey);
      day.orders += 1;

      const cents = toCents(order.totalPrice);
      const feeCents = toCents(order.deliveryFee); // 0 for orders placed before delivery fees existed

      if (order.status === "DELIVERED") {
        summary.delivered += 1;
        summary.revenueCents += cents;
        day.delivered += 1;
        day.revenueCents += cents;

        const minutes = order.deliveredAt
          ? (new Date(order.deliveredAt) - new Date(order.createdAt)) / 60000
          : null;
        const validMinutes = minutes !== null && minutes >= 0;
        if (validMinutes) {
          minutesTotal += minutes;
          minutesCount += 1;
        }

        // Per rider or delivery service: how many deliveries and how much cash they brought in
        const mediumKey = order.deliveryMedium || "";
        if (!byMedium.has(mediumKey)) {
          byMedium.set(mediumKey, {
            name: order.deliveryMedium || null,
            deliveries: 0,
            cashCents: 0,
            minutesTotal: 0,
            minutesCount: 0,
          });
        }
        const medium = byMedium.get(mediumKey);
        medium.deliveries += 1;
        medium.cashCents += cents;
        if (validMinutes) {
          medium.minutesTotal += minutes;
          medium.minutesCount += 1;
        }

        for (const item of order.items) {
          const dishKey = item.menuItemId || item.dishNameEn;
          if (!dishes.has(dishKey)) {
            dishes.set(dishKey, {
              nameEn: item.dishNameEn,
              nameFi: item.dishNameFi,
              quantity: 0,
              revenueCents: 0,
            });
          }
          const dish = dishes.get(dishKey);
          dish.quantity += item.quantity;
          dish.revenueCents += toCents(item.unitPrice) * item.quantity;
        }
      } else if (order.status === "CANCELLED") {
        summary.cancelled += 1;
        summary.cancelledValueCents += cents;
      } else {
        summary.inProgress += 1;
      }
    }

    const data = {
      range: { from, to, days },
      truncated: orders.length >= MAX_ORDERS,
      summary: {
        totalOrders: summary.totalOrders,
        delivered: summary.delivered,
        cancelled: summary.cancelled,
        inProgress: summary.inProgress,
        revenue: euros(summary.revenueCents),
        cancelledValue: euros(summary.cancelledValueCents),
        averageOrder: summary.delivered
          ? euros(summary.revenueCents / summary.delivered)
          : 0,
        averageDeliveryMinutes: minutesCount
          ? round1(minutesTotal / minutesCount)
          : null,
      },
      byMedium: [...byMedium.values()]
        .sort((a, b) => b.deliveries - a.deliveries)
        .map((m) => ({
          name: m.name, // null = no rider or service was recorded
          deliveries: m.deliveries,
          cash: euros(m.cashCents),
          averageMinutes: m.minutesCount
            ? round1(m.minutesTotal / m.minutesCount)
            : null,
        })),
      byDay: [...byDay.values()].map((d) => ({
        date: d.date,
        orders: d.orders,
        delivered: d.delivered,
        revenue: euros(d.revenueCents),
      })),
      topDishes: [...dishes.values()]
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10)
        .map((d) => ({
          nameEn: d.nameEn,
          nameFi: d.nameFi,
          quantity: d.quantity,
          revenue: euros(d.revenueCents),
        })),
      orders: orders.map((o) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        createdAt: o.createdAt,
        deliveredAt: o.deliveredAt,
        status: o.status,
        customerName: o.customerName,
        customerPhone: o.customerPhone,
        deliveryAddress: o.deliveryAddress,
        postalCode: o.postalCode,
        deliveryMedium: o.deliveryMedium,
        paymentMethod: o.paymentMethod,
        totalPrice: o.totalPrice,
        cancelReason: o.cancelReason,
        items: o.items.map((i) => `${i.quantity} x ${i.dishNameEn}`).join(", "),
      })),
    };

    return res.json({ success: true, data });
  } catch (error) {
    console.error("Get Delivery Report Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Could not build the report." });
  }
};
