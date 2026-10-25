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
  getBuffetScheduleAdmin,
} from "../controllers/menuController.js";
import { getChefPicks } from "../controllers/chefPicksController.js";
const router = Router();

// Public endpoints
router.get("/regular", getRegularMenu);
router.get("/buffet", getBuffetSchedule);
router.get("/buffetAdmin", getBuffetScheduleAdmin);

// Protected admin endpoints
router.post("/regular", verifyToken, createRegularItem);
router.put("/regular/:id", verifyToken, updateRegularItem);
router.delete("/regular/:id", verifyToken, deleteRegularItem);

router.post("/buffet", verifyToken, assignBuffetMenu);
router.delete("/buffet/:id", verifyToken, deleteBuffetMenu);

router.get("/chef-picks", getChefPicks); // Public endpoint for chef's recommendations

export default router;
