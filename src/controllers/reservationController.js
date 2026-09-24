import prisma from "../config/db.js";

// Public: Create a new reservation
export async function createReservation(req, res) {
  try {
    const { name, email, phone, guests, reservationDate, specialRequests } =
      req.body;

    if (!name || !email || !phone || !guests || !reservationDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required booking details.",
      });
    }

    const bookingTime = new Date(reservationDate);
    if (isNaN(bookingTime.getTime()) || bookingTime < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid future date and time.",
      });
    }

    const reservation = await prisma.reservation.create({
      data: {
        name,
        email,
        phone,
        guests: parseInt(guests, 10),
        reservationDate: bookingTime,
        specialRequests: specialRequests || null,
        status: "PENDING",
      },
    });

    return res.status(201).json({
      success: true,
      data: reservation,
      message: "Reservation request submitted successfully.",
    });
  } catch (error) {
    console.error("Reservation creation error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
}

// Admin: Get paginated reservations with date/status filters
export async function getAdminReservations(req, res) {
  try {
    const { status, search, page = 1, limit = 10, date } = req.query;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const take = parseInt(limit, 10);

    const where = {};

    if (status && status !== "ALL") {
      where.status = status.toUpperCase();
    }

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      where.reservationDate = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    const [total, pendingCount, reservations] = await prisma.$transaction([
      prisma.reservation.count({ where }),
      prisma.reservation.count({ where: { status: "PENDING" } }),
      prisma.reservation.findMany({
        where,
        skip,
        take,
        orderBy: { reservationDate: "asc" },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: reservations,
      pagination: {
        total,
        pages: Math.ceil(total / take),
        currentPage: parseInt(page, 10),
        pendingCount,
      },
    });
  } catch (error) {
    console.error("Admin reservations fetch error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch reservations." });
  }
}

// Admin: Update status & notes
export async function updateReservationStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const updated = await prisma.reservation.update({
      where: { id },
      data: {
        ...(status && { status: status.toUpperCase() }),
        ...(adminNotes !== undefined && { adminNotes }),
      },
    });

    return res.status(200).json({
      success: true,
      data: updated,
      message: "Reservation updated successfully.",
    });
  } catch (error) {
    console.error("Reservation status update error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update reservation." });
  }
}

// Admin: Delete reservation
export async function deleteReservation(req, res) {
  try {
    const { id } = req.params;
    await prisma.reservation.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      message: "Reservation deleted successfully.",
    });
  } catch (error) {
    console.error("Reservation deletion error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete reservation." });
  }
}
