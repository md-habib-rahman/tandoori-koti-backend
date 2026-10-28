// Two small route files. Create routes/reviewRoutes.js and routes/instagramRoutes.js, or add these to your own.
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";

// ---------------------------------------------------------------- routes/reviewRoutes.js
import {
  createReview,
  deleteReview,
  getAdminReviews,
  getPublicReviews,
  getReviewSettings,
  saveReviewSettings,
  setReviewPublished,
  updateReview,
} from "../controllers/reviewController.js";

export const reviewRouter = express.Router();

reviewRouter.get("/", getPublicReviews);

// The "settings" routes must come BEFORE the ones with :id, or "settings" would be read as an id
reviewRouter.get("/admin/settings", verifyToken, getReviewSettings);
reviewRouter.put("/admin/settings", verifyToken, saveReviewSettings);

reviewRouter.get("/admin", verifyToken, getAdminReviews);
reviewRouter.post("/admin", verifyToken, createReview);
reviewRouter.put("/admin/:id", verifyToken, updateReview);
reviewRouter.patch("/admin/:id/published", verifyToken, setReviewPublished);
reviewRouter.delete("/admin/:id", verifyToken, deleteReview);

// ------------------------------------------------------------- routes/instagramRoutes.js
import {
  createInstagramPhoto,
  deleteInstagramPhoto,
  getAdminInstagramPhotos,
  getPublicInstagramPhotos,
  moveInstagramPhoto,
  updateInstagramPhoto,
} from "../controllers/instagramController.js";

export const instagramRouter = express.Router();

instagramRouter.get("/", getPublicInstagramPhotos);

instagramRouter.get("/admin", verifyToken, getAdminInstagramPhotos);
instagramRouter.post("/admin", verifyToken, createInstagramPhoto);
instagramRouter.put("/admin/:id", verifyToken, updateInstagramPhoto);
instagramRouter.patch("/admin/:id/move", verifyToken, moveInstagramPhoto);
instagramRouter.delete("/admin/:id", verifyToken, deleteInstagramPhoto);

// ------------------------------------------------------------------ in your main app file
//   app.use("/api/reviews", reviewRouter);
//   app.use("/api/instagram", instagramRouter);
