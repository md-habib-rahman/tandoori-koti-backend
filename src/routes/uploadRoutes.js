import upload from "../middlewares/upload.js";
import { Router } from "express";
import verifyToken from "../middlewares/auth.js";
import { uploadImage } from "../controllers/uploadController.js";

const router = Router();
// Protect the route and process a single file field named 'image'
router.post("/", verifyToken, upload.single("image"), uploadImage);

export default router;
