const prisma = require("../config/db");

// ==========================================
// REGULAR MENU (A La Carte)
// ==========================================

const getRegularMenu = async (req, res) => {
  try {
    const menu = await prisma.regularMenu.findMany({
      orderBy: { category: "asc" }, // Groups items by category alphabetically
    });
    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
};

const createRegularItem = async (req, res) => {
  try {
    const { category, nameFi, nameEn, preparation, price, imageUrl } = req.body;

    const newItem = await prisma.regularMenu.create({
      data: {
        category,
        nameFi,
        nameEn,
        preparation,
        price: parseFloat(price),
        imageUrl,
      },
    });
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to create item" });
  }
};

const deleteRegularItem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.regularMenu.delete({ where: { id } });
    res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
};

// ==========================================
// BUFFET MENU SYSTEM
// ==========================================

const getBuffetSchedule = async (req, res) => {
  try {
    // Includes the nested BuffetItem data for each assigned menu
    const schedule = await prisma.buffetMenu.findMany({
      include: { items: true },
      orderBy: { date: "asc" },
    });
    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch buffet schedule" });
  }
};

const assignBuffetMenu = async (req, res) => {
  try {
    const { date, weekday, itemIds } = req.body;

    const newMenu = await prisma.buffetMenu.create({
      data: {
        date: new Date(date), // Formats string to Prisma DateTime
        weekday,
        items: {
          connect: itemIds.map((id) => ({ id })), // Links pre-stored items
        },
      },
      include: { items: true },
    });

    res.status(201).json({ success: true, data: newMenu });
  } catch (error) {
    res.status(500).json({ error: "Failed to assign buffet" });
  }
};

module.exports = {
  getRegularMenu,
  createRegularItem,
  deleteRegularItem,
  getBuffetSchedule,
  assignBuffetMenu,
};
