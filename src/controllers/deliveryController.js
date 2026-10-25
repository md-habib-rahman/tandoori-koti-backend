import prisma from "../config/db.js"; // Adjust path to your Prisma client instance
import { getDeliveryFee, roundMoney } from "../utils/deliveryFee.js"; // NEW
// Utility to generate a human-readable order number (e.g., TK-20261004-9B3F)
const generateOrderNumber = () => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TK-${dateStr}-${randomStr}`;
};

// 1. Submit Delivery Order (Public)
export const createDeliveryOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      deliveryAddress,
      postalCode,
      notes,
      items, // Array of { id: string, quantity: number }
    } = req.body;

    if (
      !customerName ||
      !customerPhone ||
      !deliveryAddress ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Customer name, phone, address, and at least one item are required.",
      });
    }

    // Extract item IDs and query database to fetch verified current prices
    const itemIds = items.map((i) => i.id);
    const dbDishes = await prisma.regularMenu.findMany({
      where: { id: { in: itemIds } },
    });

    if (dbDishes.length !== items.length) {
      return res.status(400).json({
        success: false,
        message:
          "One or more selected dishes were not found or are no longer available.",
      });
    }

    // Calculate real total from DB prices
    let calculatedTotal = 0;
    const orderItemsData = items.map((item) => {
      const dish = dbDishes.find((d) => d.id === item.id);
      const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
      calculatedTotal += dish.price * qty;

      return {
        menuItemId: dish.id,
        dishNameEn: dish.nameEn,
        dishNameFi: dish.nameFi,
        quantity: qty,
        unitPrice: dish.price,
      };
    });

    const settings = await prisma.settings.findUnique({ where: { id: 1 } });
    const deliveryFee = getDeliveryFee(settings);

    // Create the order and items in a single transaction
    const newOrder = await prisma.deliveryOrder.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        deliveryAddress: deliveryAddress.trim(),
        postalCode: postalCode ? postalCode.trim() : null,
        notes: notes ? notes.trim() : null,
        // totalPrice: parseFloat(calculatedTotal.toFixed(2)),
        totalPrice: roundMoney(calculatedTotal + deliveryFee),
        deliveryFee,
        menuTotal: calculatedTotal,
        paymentMethod: "CASH_ON_DELIVERY",
        status: "PENDING",
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });

    return res.status(201).json({
      success: true,
      message:
        "Order placed successfully. Payment will be collected upon delivery.",
      data: newOrder,
    });
  } catch (error) {
    console.error("Create Delivery Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while placing delivery order.",
    });
  }
};

// 2. Get All Delivery Orders (Admin)
export const getAllDeliveryOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const whereClause = status ? { status } : {};

    const orders = await prisma.deliveryOrder.findMany({
      where: whereClause,
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Get All Delivery Orders Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve delivery orders.",
    });
  }
};

// 3. Update Delivery Order Status (Admin)
export const updateDeliveryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "PREPARING",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery status value.",
      });
    }

    const updatedOrder = await prisma.deliveryOrder.update({
      where: { id },
      data: { status },
      include: { items: true },
    });

    return res.status(200).json({
      success: true,
      message: "Status updated successfully.",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update order status.",
    });
  }
};
