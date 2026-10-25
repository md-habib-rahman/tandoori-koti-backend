// controllers/reviewController.js
import prisma from "../config/db.js"; // ADJUST: wherever your PrismaClient instance is exported
import { parseReview, parseReviewSettings } from "../utils/reviewFields.js";

const HOMEPAGE_COUNT = 6; // how many reviews the home page loads
const LATEST_FIRST = [{ reviewedAt: "desc" }, { createdAt: "desc" }];

const failure = (res, status, message, errors) =>
  res
    .status(status)
    .json({ success: false, message, ...(errors ? { errors } : {}) });

// ---------------------------------------------------------------------------
// PUBLIC: GET /api/reviews
// The latest 6 published reviews, plus the numbers for the rating pill.
// ---------------------------------------------------------------------------
export const getPublicReviews = async (req, res) => {
  try {
    const [reviews, settings] = await Promise.all([
      prisma.review.findMany({
        where: { isPublished: true },
        orderBy: LATEST_FIRST,
        take: HOMEPAGE_COUNT,
        select: {
          id: true,
          authorName: true,
          rating: true,
          text: true,
          source: true,
          reviewedAt: true,
        },
      }),
      prisma.reviewSettings.findUnique({ where: { id: 1 } }),
    ]);

    // Browsers and CDNs may reuse the answer for a minute, so a change can take up to a minute to show
    res.set("Cache-Control", "public, max-age=60");
    return res.json({
      success: true,
      data: reviews,
      summary: settings
        ? {
            googleRating: settings.googleRating,
            googleReviewCount: settings.googleReviewCount,
            googleReviewsUrl: settings.googleReviewsUrl,
          }
        : null,
    });
  } catch (error) {
    console.error("Get Public Reviews Error:", error);
    return failure(res, 500, "Could not load reviews.");
  }
};

// ---------------------------------------------------------------------------
// ADMIN: GET /api/reviews/admin?page=1&limit=10&search=...&published=true|false
// Every review, newest first. `onHomepage` marks the ones the home page is showing right now.
// ---------------------------------------------------------------------------
export const getAdminReviews = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      50,
      Math.max(1, parseInt(req.query.limit, 10) || 10),
    );
    const search = String(req.query.search || "").trim();

    const where = {};
    if (req.query.published === "true") where.isPublished = true;
    if (req.query.published === "false") where.isPublished = false;
    if (search) {
      where.OR = [
        { authorName: { contains: search } },
        { text: { contains: search } },
      ];
    }

    const [rows, total, homepage] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: LATEST_FIRST,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.review.count({ where }),
      prisma.review.findMany({
        where: { isPublished: true },
        orderBy: LATEST_FIRST,
        take: HOMEPAGE_COUNT,
        select: { id: true },
      }),
    ]);

    const onHomepage = new Set(homepage.map((r) => r.id));
    return res.json({
      success: true,
      data: rows.map((r) => ({ ...r, onHomepage: onHomepage.has(r.id) })),
      pagination: {
        pages: Math.max(1, Math.ceil(total / limit)),
        total,
        homepageCount: HOMEPAGE_COUNT,
      },
    });
  } catch (error) {
    console.error("Get Admin Reviews Error:", error);
    return failure(res, 500, "Could not load reviews.");
  }
};

// ADMIN: POST /api/reviews/admin
export const createReview = async (req, res) => {
  try {
    const { data, errors } = parseReview(req.body);
    if (errors) return failure(res, 400, "Please check the review.", errors);

    const review = await prisma.review.create({ data });
    return res.status(201).json({ success: true, data: review });
  } catch (error) {
    console.error("Create Review Error:", error);
    return failure(res, 500, "Could not save the review.");
  }
};

// ADMIN: PUT /api/reviews/admin/:id
export const updateReview = async (req, res) => {
  try {
    const { data, errors } = parseReview(req.body);
    if (errors) return failure(res, 400, "Please check the review.", errors);

    const review = await prisma.review.update({
      where: { id: req.params.id },
      data,
    });
    return res.json({ success: true, data: review });
  } catch (error) {
    if (error.code === "P2025") return failure(res, 404, "Review not found.");
    console.error("Update Review Error:", error);
    return failure(res, 500, "Could not save the review.");
  }
};

// ADMIN: PATCH /api/reviews/admin/:id/published   body: { isPublished: true | false }
export const setReviewPublished = async (req, res) => {
  try {
    const flag = String(req.body.isPublished).toLowerCase();
    if (flag !== "true" && flag !== "false")
      return failure(res, 400, "isPublished must be true or false.");

    const review = await prisma.review.update({
      where: { id: req.params.id },
      data: { isPublished: flag === "true" },
    });
    return res.json({ success: true, data: review });
  } catch (error) {
    if (error.code === "P2025") return failure(res, 404, "Review not found.");
    console.error("Set Review Published Error:", error);
    return failure(res, 500, "Could not update the review.");
  }
};

// ADMIN: DELETE /api/reviews/admin/:id
export const deleteReview = async (req, res) => {
  try {
    await prisma.review.delete({ where: { id: req.params.id } });
    return res.json({ success: true });
  } catch (error) {
    if (error.code === "P2025") return failure(res, 404, "Review not found.");
    console.error("Delete Review Error:", error);
    return failure(res, 500, "Could not delete the review.");
  }
};

// ADMIN: GET /api/reviews/admin/settings
export const getReviewSettings = async (req, res) => {
  try {
    const settings = await prisma.reviewSettings.findUnique({
      where: { id: 1 },
    });
    return res.json({
      success: true,
      data: settings || {
        googleRating: null,
        googleReviewCount: null,
        googleReviewsUrl: null,
      },
    });
  } catch (error) {
    console.error("Get Review Settings Error:", error);
    return failure(res, 500, "Could not load the settings.");
  }
};

// ADMIN: PUT /api/reviews/admin/settings
export const saveReviewSettings = async (req, res) => {
  try {
    const { data, errors } = parseReviewSettings(req.body);
    if (errors) return failure(res, 400, "Please check the values.", errors);

    const settings = await prisma.reviewSettings.upsert({
      where: { id: 1 },
      create: { id: 1, ...data },
      update: data,
    });
    return res.json({ success: true, data: settings });
  } catch (error) {
    console.error("Save Review Settings Error:", error);
    return failure(res, 500, "Could not save the settings.");
  }
};
