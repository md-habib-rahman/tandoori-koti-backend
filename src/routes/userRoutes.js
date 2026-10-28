import { Router } from "express";
import * as users from "../controllers/userController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

// app.use("/api/users", userRoutes)
const router = Router();
router.use(requireAuth);

// any logged-in user
router.get("/me", users.getMe);
router.patch("/me/password", users.changeOwnPassword);

// ADMIN only
router.get("/", requireRole("ADMIN"), users.listUsers);
router.post("/", requireRole("ADMIN"), users.createUser);
router.patch("/:id/role", requireRole("ADMIN"), users.updateRole);
router.delete("/:id", requireRole("ADMIN"), users.deleteUser);

export default router;
