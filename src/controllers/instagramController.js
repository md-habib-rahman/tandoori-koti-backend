// controllers/instagramController.js
import prisma from "../config/db.js"; // ADJUST: wherever your PrismaClient instance is exported
import { MAX_INSTAGRAM_PHOTOS, parseInstagramPhoto } from "../utils/instagramFields.js";

const IN_ORDER = [{ sortOrder: "asc" }, { createdAt: "asc" }];

const failure = (res, status, message, errors) =>
  res.status(status).json({ success: false, message, ...(errors ? { errors } : {}) });

// PUBLIC: GET /api/instagram
// The photos for the home page grid, in the order staff chose.
export const getPublicInstagramPhotos = async (req, res) => {
  try {
    const photos = await prisma.instagramPhoto.findMany({
      orderBy: IN_ORDER,
      take: MAX_INSTAGRAM_PHOTOS,
      select: { id: true, imageUrl: true, altFi: true, altEn: true, postUrl: true },
    });

    res.set("Cache-Control", "public, max-age=60"); // changes can take up to a minute to show
    return res.json({ success: true, data: photos });
  } catch (error) {
    console.error("Get Public Instagram Photos Error:", error);
    return failure(res, 500, "Could not load photos.");
  }
};

// ADMIN: GET /api/instagram/admin
export const getAdminInstagramPhotos = async (req, res) => {
  try {
    const photos = await prisma.instagramPhoto.findMany({ orderBy: IN_ORDER });
    return res.json({ success: true, data: photos, max: MAX_INSTAGRAM_PHOTOS });
  } catch (error) {
    console.error("Get Admin Instagram Photos Error:", error);
    return failure(res, 500, "Could not load photos.");
  }
};

// ADMIN: POST /api/instagram/admin   (the new photo goes last)
export const createInstagramPhoto = async (req, res) => {
  try {
    const { data, errors } = parseInstagramPhoto(req.body);
    if (errors) return failure(res, 400, "Please check the photo.", errors);

    const count = await prisma.instagramPhoto.count();
    if (count >= MAX_INSTAGRAM_PHOTOS) {
      return failure(res, 400, `The grid holds ${MAX_INSTAGRAM_PHOTOS} photos. Delete one before adding another.`);
    }

    const last = await prisma.instagramPhoto.aggregate({ _max: { sortOrder: true } });
    const photo = await prisma.instagramPhoto.create({
      data: { ...data, sortOrder: (last._max.sortOrder ?? 0) + 1 },
    });
    return res.status(201).json({ success: true, data: photo });
  } catch (error) {
    console.error("Create Instagram Photo Error:", error);
    return failure(res, 500, "Could not save the photo.");
  }
};

// ADMIN: PUT /api/instagram/admin/:id
export const updateInstagramPhoto = async (req, res) => {
  try {
    const { data, errors } = parseInstagramPhoto(req.body);
    if (errors) return failure(res, 400, "Please check the photo.", errors);

    const photo = await prisma.instagramPhoto.update({ where: { id: req.params.id }, data });
    return res.json({ success: true, data: photo });
  } catch (error) {
    if (error.code === "P2025") return failure(res, 404, "Photo not found.");
    console.error("Update Instagram Photo Error:", error);
    return failure(res, 500, "Could not save the photo.");
  }
};

// ADMIN: DELETE /api/instagram/admin/:id
export const deleteInstagramPhoto = async (req, res) => {
  try {
    await prisma.instagramPhoto.delete({ where: { id: req.params.id } });
    return res.json({ success: true });
  } catch (error) {
    if (error.code === "P2025") return failure(res, 404, "Photo not found.");
    console.error("Delete Instagram Photo Error:", error);
    return failure(res, 500, "Could not delete the photo.");
  }
};

// ADMIN: PATCH /api/instagram/admin/:id/move   body: { direction: "up" | "down" }
// Renumbers everything 1, 2, 3... so the order stays clean however many times it is changed.
export const moveInstagramPhoto = async (req, res) => {
  try {
    const { direction } = req.body;
    if (direction !== "up" && direction !== "down") {
      return failure(res, 400, 'direction must be "up" or "down".');
    }

    const photos = await prisma.instagramPhoto.findMany({ orderBy: IN_ORDER, select: { id: true } });
    const from = photos.findIndex((p) => p.id === req.params.id);
    if (from === -1) return failure(res, 404, "Photo not found.");

    const to = direction === "up" ? from - 1 : from + 1;
    if (to >= 0 && to < photos.length) {
      [photos[from], photos[to]] = [photos[to], photos[from]];
      await prisma.$transaction(
        photos.map((p, index) =>
          prisma.instagramPhoto.update({ where: { id: p.id }, data: { sortOrder: index + 1 } }),
        ),
      );
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("Move Instagram Photo Error:", error);
    return failure(res, 500, "Could not change the order.");
  }
};