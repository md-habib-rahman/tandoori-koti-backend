import prisma from "../config/db.js";

// ==========================================
// REGULAR MENU (Bilingual A La Carte)
// ==========================================

export const getRegularMenu = async (req, res) => {
  try {
    const menu = await prisma.regularMenu.findMany({
      orderBy: { categoryEn: "asc" },
    });
    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
};

export const createRegularItem = async (req, res) => {
  try {
    const {
      categoryFi,
      categoryEn,
      nameFi,
      nameEn,
      preparationFi,
      preparationEn,
      price,
      imageUrl,
    } = req.body;

    const newItem = await prisma.regularMenu.create({
      data: {
        categoryFi,
        categoryEn,
        nameFi,
        nameEn,
        preparationFi,
        preparationEn,
        price: parseFloat(price),
        imageUrl: imageUrl || "",
      },
    });

    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    console.error("Create Dish Error:", error);
    res.status(500).json({ error: "Failed to create item" });
  }
};

export const updateRegularItem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      categoryFi,
      categoryEn,
      nameFi,
      nameEn,
      preparationFi,
      preparationEn,
      price,
      imageUrl,
    } = req.body;

    const updatedItem = await prisma.regularMenu.update({
      where: { id },
      data: {
        categoryFi,
        categoryEn,
        nameFi,
        nameEn,
        preparationFi,
        preparationEn,
        price: parseFloat(price),
        ...(imageUrl && { imageUrl }),
      },
    });

    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    console.error("Update Dish Error:", error);
    res.status(500).json({ error: "Failed to update item" });
  }
};

export const deleteRegularItem = async (req, res) => {
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

export const getBuffetSchedule = async (req, res) => {
  try {
    const schedule = await prisma.buffetMenu.findMany({
      include: { dishes: true },
      orderBy: { date: "asc" },
    });
    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch buffet schedule" });
  }
};

export const assignBuffetMenu = async (req, res) => {
  try {
    const { date, weekday, dishIds } = req.body;
    const targetDate = new Date(date);
    const dishConnections = (dishIds || []).map((id) => ({ id }));

    const existingMenu = await prisma.buffetMenu.findFirst({
      where: { date: targetDate },
    });

    let savedMenu;
    if (existingMenu) {
      savedMenu = await prisma.buffetMenu.update({
        where: { id: existingMenu.id },
        data: {
          weekday,
          dishes: {
            set: dishConnections,
          },
        },
        include: { dishes: true },
      });
    } else {
      savedMenu = await prisma.buffetMenu.create({
        data: {
          date: targetDate,
          weekday,
          dishes: {
            connect: dishConnections,
          },
        },
        include: { dishes: true },
      });
    }

    res.status(200).json({ success: true, data: savedMenu });
  } catch (error) {
    console.error("Assign Buffet Error:", error);
    res.status(500).json({ error: "Failed to assign buffet" });
  }
};

export const deleteBuffetMenu = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.buffetMenu.delete({ where: { id } });
    res
      .status(200)
      .json({ success: true, message: "Scheduled buffet deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete buffet" });
  }
};
