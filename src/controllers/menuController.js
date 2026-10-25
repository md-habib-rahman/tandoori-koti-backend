import prisma from "../config/db.js";
import {
  checkChefPickLimit,
  parseChefPickFields,
} from "../utils/chefPickFields.js";
import { parseServingFields } from "../utils/servingFields.js";

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
      storyFi,
      storyEn,
      price,
      imageUrl,
    } = req.body;

    const serving = parseServingFields(req.body);
    const chef = parseChefPickFields(req.body);
    const errors = { ...(serving.errors || {}), ...(chef.errors || {}) };
    if (Object.keys(errors).length) {
      return res.status(400).json({
        success: false,
        message: "Invalid serving information.",
        errors,
      });
    }

    const limitError = await checkChefPickLimit(prisma, {
      id: req.params.id, // leave this out in the create controller
      isChefPick: chef.data.isChefPick,
    });
    if (limitError)
      return res.status(400).json({ success: false, message: limitError });

    // in createMenuItem / updateMenuItem, before the Prisma call:
    // const serving = parseServingFields(req.body);
    // if (serving.errors) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid serving information.",
    //     errors: serving.errors,
    //   });
    // }

    const newItem = await prisma.regularMenu.create({
      data: {
        categoryFi,
        categoryEn,
        nameFi,
        nameEn,
        preparationFi,
        preparationEn,
        storyFi: storyFi || null,
        storyEn: storyEn || null,
        price: parseFloat(price),
        imageUrl: imageUrl || "",
        ...serving.data,
        ...chef.data,
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
      storyFi,
      storyEn,
      price,
      imageUrl,
    } = req.body;

    const serving = parseServingFields(req.body);
    const chef = parseChefPickFields(req.body);
    const errors = { ...(serving.errors || {}), ...(chef.errors || {}) };
    if (Object.keys(errors).length) {
      return res.status(400).json({
        success: false,
        message: "Invalid serving information.",
        errors,
      });
    }

    const limitError = await checkChefPickLimit(prisma, {
      id: req.params.id, // leave this out in the create controller
      isChefPick: chef.data.isChefPick,
    });
    if (limitError)
      return res.status(400).json({ success: false, message: limitError });

    const updatedItem = await prisma.regularMenu.update({
      where: { id },
      data: {
        ...(categoryFi !== undefined && { categoryFi }),
        ...(categoryEn !== undefined && { categoryEn }),
        ...(nameFi !== undefined && { nameFi }),
        ...(nameEn !== undefined && { nameEn }),
        ...(preparationFi !== undefined && { preparationFi }),
        ...(preparationEn !== undefined && { preparationEn }),
        ...(storyFi !== undefined && { storyFi: storyFi || null }),
        ...(storyEn !== undefined && { storyEn: storyEn || null }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...serving.data,
        ...chef.data,
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

export const getBuffetScheduleAdmin = async (req, res) => {
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

export const getBuffetSchedule = async (req, res) => {
  try {
    const now = new Date();

    // Start of the current week: Sunday at 00:00:00
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    // End boundary: next Sunday at 00:00:00 (exclusive)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const schedule = await prisma.buffetMenu.findMany({
      where: {
        date: {
          gte: startOfWeek,
          lt: endOfWeek,
        },
      },
      include: {
        dishes: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    res.status(200).json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    console.error("Failed to fetch buffet schedule:", error);

    res.status(500).json({
      success: false,
      error: "Failed to fetch buffet schedule",
    });
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
