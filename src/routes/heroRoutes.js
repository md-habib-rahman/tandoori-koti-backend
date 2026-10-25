import { Router } from "express";
import multer from "multer";
import * as hero from "../controllers/heroController.js";
// Use whatever auth middleware you already have for admin routes:
import verifyToken from "../middlewares/auth.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
  fileFilter: (req, file, cb) =>
    /^image\/(jpeg|png|webp)$/.test(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Only JPG, PNG or WebP")),
});

// Public: app.use("/api/hero", publicHeroRoutes)
export const publicHeroRoutes = Router();
publicHeroRoutes.get("/", hero.getPublicHero);

// Admin: app.use("/api/admin/hero", adminHeroRoutes)
export const adminHeroRoutes = Router();
adminHeroRoutes.use(verifyToken);
adminHeroRoutes.get("/", hero.getAdminHero);
adminHeroRoutes.put("/slides/:id", hero.updateSlide);
adminHeroRoutes.put("/band", hero.updateBand);
adminHeroRoutes.post("/upload", upload.single("image"), hero.uploadImage);
