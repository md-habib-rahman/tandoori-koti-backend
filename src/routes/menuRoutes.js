import { Router } from "express";
import verifyToken from "../middlewares/auth.js";
import {
  getRegularMenu,
  getBuffetSchedule,
  createRegularItem,
  updateRegularItem,
  deleteRegularItem,
  assignBuffetMenu,
  deleteBuffetMenu,
} from "../controllers/menuController.js";
const router = Router();

// Public endpoints
router.get("/regular", getRegularMenu);
router.get("/buffet", getBuffetSchedule);

// Protected admin endpoints
router.post("/regular", verifyToken, createRegularItem);
router.put("/regular/:id", verifyToken, updateRegularItem);
router.delete("/regular/:id", verifyToken, deleteRegularItem);

router.post("/buffet", verifyToken, assignBuffetMenu);
router.delete("/buffet/:id", verifyToken, deleteBuffetMenu);

export default router;
