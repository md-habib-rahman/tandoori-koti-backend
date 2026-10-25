import prisma from "../config/db.js";
export const ACTIVE_STATUSES = ["PENDING", "PREPARING", "OUT_FOR_DELIVERY"];

const TRANSITIONS = {
  PENDING: ["PREPARING", "CANCELLED"],
  PREPARING: ["OUT_FOR_DELIVERY", "CANCELLED"],
  OUT_FOR_DELIVERY: ["DELIVERED", "CANCELLED"],
  DELIVERED: [],
  CANCELLED: [],
};

const MAX_MEDIUM_LENGTH = 60;

function cleanMediumName(raw) {
  if (raw === undefined || raw === null) return null;
  const text = String(raw).replace(/\s+/g, " ").trim();
  if (text === "") return null;
  return text.length > MAX_MEDIUM_LENGTH ? "TOO_LONG" : text;
}

// If "wolt" was typed and "Wolt" was used before, reuse "Wolt", so the report does not split them in two
async function useExistingSpelling(name) {
  const rows = await prisma.deliveryOrder.findMany({
    where: { deliveryMedium: { not: null } },
    distinct: ["deliveryMedium"],
    select: { deliveryMedium: true },
  });
  const match = rows.find(
    (r) => r.deliveryMedium.toLowerCase() === name.toLowerCase(),
  );
  return match ? match.deliveryMedium : name;
}

// GET /api/delivery/admin/board
// Everything the dashboard needs in one call: all open orders, plus anything from the last 24 hours.
export const getDeliveryBoard = async (req, res) => {
  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const orders = await prisma.deliveryOrder.findMany({
      where: {
        OR: [
          { status: { in: ACTIVE_STATUSES } },
          { createdAt: { gte: since } },
        ],
      },
      include: { items: true },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    return res.json({
      success: true,
      data: orders,
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Get Delivery Board Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Could not load delivery orders." });
  }
};

// GET /api/delivery/admin/mediums
// Every rider or delivery service used before, most recently used first. This feeds the dropdown.
export const getDeliveryMediums = async (req, res) => {
  try {
    const rows = await prisma.deliveryOrder.groupBy({
      by: ["deliveryMedium"],
      where: { deliveryMedium: { not: null } },
      _count: { _all: true },
      _max: { createdAt: true },
    });

    const data = rows
      .filter((r) => r.deliveryMedium)
      .sort((a, b) => b._max.createdAt - a._max.createdAt)
      .map((r) => ({
        name: r.deliveryMedium,
        count: r._count._all,
        lastUsedAt: r._max.createdAt,
      }));

    return res.json({ success: true, data });
  } catch (error) {
    console.error("Get Delivery Mediums Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Could not load delivery options." });
  }
};

// PATCH /api/delivery/admin/orders/:id/status
// Body: { status, cancelReason?, deliveryMedium? }
// Moving to OUT_FOR_DELIVERY needs a deliveryMedium (sent now, or already saved on the order).
export const updateDeliveryOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; // if your id column is an Int, use Number(req.params.id)
    const { status, cancelReason, deliveryMedium } = req.body;

    if (!Object.keys(TRANSITIONS).includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status." });
    }
    if (cancelReason !== undefined && String(cancelReason).length > 300) {
      return res
        .status(400)
        .json({ success: false, message: "Cancel reason is too long." });
    }

    const cleaned = cleanMediumName(deliveryMedium);
    if (cleaned === "TOO_LONG") {
      return res.status(400).json({
        success: false,
        message: `The delivery name must be ${MAX_MEDIUM_LENGTH} characters or fewer.`,
      });
    }

    const order = await prisma.deliveryOrder.findUnique({ where: { id } });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    if (!TRANSITIONS[order.status]?.includes(status)) {
      return res.status(409).json({
        success: false,
        message: `This order is already "${order.status}", so it cannot be changed to "${status}".`,
      });
    }

    let medium;
    if (status === "OUT_FOR_DELIVERY") {
      medium = cleaned
        ? await useExistingSpelling(cleaned)
        : order.deliveryMedium;
      if (!medium) {
        return res.status(400).json({
          success: false,
          message:
            "Choose who delivers this order (a rider or a delivery service).",
        });
      }
    }

    // Only update if nobody else changed the order in the meantime (two staff, two devices)
    const result = await prisma.deliveryOrder.updateMany({
      where: { id, status: order.status },
      data: {
        status,
        ...(status === "OUT_FOR_DELIVERY" ? { deliveryMedium: medium } : {}),
        ...(status === "DELIVERED" ? { deliveredAt: new Date() } : {}),
        ...(status === "CANCELLED" && { updatedAt: new Date() }),
      },
    });

    if (result.count === 0) {
      return res.status(409).json({
        success: false,
        message:
          "Someone else just updated this order. Refresh to see the latest status.",
      });
    }

    const updated = await prisma.deliveryOrder.findUnique({
      where: { id },
      include: { items: true },
    });

    return res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update Delivery Order Status Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Could not update the order." });
  }
};
