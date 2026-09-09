import prisma from "../config/db.js";

// Public: Create contact message
export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone number are required.",
      });
    }

    const clientIp =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      "";

    const newMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        message: message?.trim() || null,
        ipAddress: clientIp,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Message submitted successfully.",
      data: { id: newMessage.id },
    });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit message.",
    });
  }
};

// Admin: Get paginated & filtered messages
export const getContactMessages = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const take = parseInt(limit, 10);
    const skip = (parseInt(page, 10) - 1) * take;

    const where = {};

    if (status && status !== "all") {
      where.status = status.toUpperCase();
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }

    const [messages, total, unreadCount] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.contactMessage.count({ where }),
      prisma.contactMessage.count({ where: { status: "UNREAD" } }),
    ]);

    return res.status(200).json({
      success: true,
      data: messages,
      pagination: {
        total,
        page: parseInt(page, 10),
        pages: Math.ceil(total / take),
        unreadCount,
      },
    });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Update status
export const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const normalizedStatus = status.toUpperCase();
    if (!["UNREAD", "READ", "REPLIED", "ARCHIVED"].includes(normalizedStatus)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status: normalizedStatus },
    });

    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating message status:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Delete message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.contactMessage.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
