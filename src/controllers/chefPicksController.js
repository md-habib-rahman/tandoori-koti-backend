// controllers/chefPicksController.js
import prisma from "../config/db.js"; // ADJUST: wherever your PrismaClient instance is exported

// GET /api/menu/chef-picks   (public, no login needed)
// Returns the dishes marked as chef's recommendations, in the order the staff chose.
export const getChefPicks = async (req, res) => {
  try {
    const dishes = await prisma.regularMenu.findMany({
      where: { isChefPick: true },
      select: {
        id: true,
        categoryEn: true,
        categoryFi: true,
        nameEn: true,
        nameFi: true,
        preparationEn: true,
        preparationFi: true,
        price: true,
        imageUrl: true,
        servings: true,
        portionLabelEn: true,
        portionLabelFi: true,
        chefTagEn: true,
        chefTagFi: true,
        chefPickOrder: true,
        createdAt: true,
      },
    });

    // Dishes with an order number come first (1, 2, 3...), the rest follow by date added
    dishes.sort(
      (a, b) =>
        (a.chefPickOrder ?? Number.MAX_SAFE_INTEGER) -
          (b.chefPickOrder ?? Number.MAX_SAFE_INTEGER) ||
        a.createdAt - b.createdAt,
    );

    // The home page does not need the date
    const data = dishes.map(({ createdAt, ...dish }) => dish);

    // Lets browsers and CDNs reuse the answer for a minute: the home page loads faster
    res.set("Cache-Control", "public, max-age=60");
    return res.json({ success: true, data });
  } catch (error) {
    console.error("Get Chef Picks Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Could not load chef's recommendations.",
      });
  }
};

// Add to your menu routes file (the one that has router.get("/regular", ...)):
//
//   import { getChefPicks } from "../controllers/chefPicksController.js";
//   router.get("/chef-picks", getChefPicks);
//
// Mounted like your other menu routes, this becomes GET /api/menu/chef-picks.
