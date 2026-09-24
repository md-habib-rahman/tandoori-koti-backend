import express from "express";
import {
  submitContactMessage,
  getContactMessages,
  updateMessageStatus,
  deleteMessage,
} from "../controllers/contactController.js";

import verifyCaptcha from "../middlewares/verifyCaptcha.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

// Public route with Rate Limiter & Captcha verification
router.post("/", verifyCaptcha, submitContactMessage);

// Admin routes (attach your auth guards e.g., protect, adminOnly)
router.get("/admin", verifyToken, getContactMessages);
router.patch("/admin/:id/status", verifyToken, updateMessageStatus);
router.delete("/admin/:id", verifyToken, deleteMessage);

export default router;
