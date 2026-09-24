import { Router } from "express";
import {
  createReservation,
  getAdminReservations,
  updateReservationStatus,
  deleteReservation,
} from "../controllers/reservationController.js";
import verifyToken from "../middlewares/auth.js";
import verifyCaptcha from "../middlewares/verifyCaptcha.js";
const router = Router();

// Public route
router.post("/", verifyCaptcha, createReservation);

// Admin-protected routes
router.get("/admin", verifyToken, getAdminReservations);
router.patch("/admin/:id", verifyToken, updateReservationStatus);
router.delete("/admin/:id", verifyToken, deleteReservation);

export default router;
