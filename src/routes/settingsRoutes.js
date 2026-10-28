import { Router } from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";
import verifyToken from "../middlewares/verifyToken.js";



const settingsRoutes = Router();

settingsRoutes.get("/", getSettings);
settingsRoutes.put("/admin", verifyToken, updateSettings);

export default settingsRoutes;
