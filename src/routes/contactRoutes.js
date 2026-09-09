import express from "express";
import {
  submitContactMessage,
  getContactMessages,
  updateMessageStatus,
  deleteMessage,
} from "../controllers/contactController.js";

import verifyCaptcha from "../middlewares/verifyCaptcha.js";

const router = express.Router();

// Public route with Rate Limiter & Captcha verification
router.post("/", verifyCaptcha, submitContactMessage);

// Admin routes (attach your auth guards e.g., protect, adminOnly)
router.get("/admin", getContactMessages);
router.patch("/admin/:id/status", updateMessageStatus);
router.delete("/admin/:id", deleteMessage);

export default router;
