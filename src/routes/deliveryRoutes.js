import { Router } from "express";
import { createDeliveryOrder } from "../controllers/deliveryController.js";
import { contactRateLimiter } from "../middlewares/contactRateLimiter.js";
import verifyRecaptcha from "../middlewares/verifyCaptcha.js";
import verifyToken from "../middlewares/verifyToken.js";
// import { verifyToken } from "../middlewares/auth.js";
import {
  getDeliveryBoard,
  getDeliveryMediums,
  updateDeliveryOrderStatus,
} from "../controllers/deliveryAdminController.js";
import { getDeliveryReport } from "../controllers/deliveryReportController.js";

const router = Router();

// Public: Place an order
router.post("/", contactRateLimiter, verifyRecaptcha, createDeliveryOrder);

// Admin: Query orders & update statuses
router.get("/admin/board", verifyToken, getDeliveryBoard);
router.get("/admin/mediums", verifyToken, getDeliveryMediums); // NEW: riders and services used before
router.get("/admin/report", verifyToken, getDeliveryReport); // NEW: ?from=YYYY-MM-DD&to=YYYY-MM-DD
router.patch(
  "/admin/orders/:id/status",
  verifyToken,
  updateDeliveryOrderStatus,
);

export default router;
