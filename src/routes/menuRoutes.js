const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const {
  getRegularMenu,
  createRegularItem,
  deleteRegularItem,
  getBuffetSchedule,
  assignBuffetMenu,
} = require("../controllers/menuController");

// Public Routes (For the restaurant website)
router.get("/regular", getRegularMenu);
router.get("/buffet", getBuffetSchedule);

// Protected Admin Routes (For the CMS Dashboard)
router.post("/regular", verifyToken, createRegularItem);
router.delete("/regular/:id", verifyToken, deleteRegularItem);

router.post("/buffet", verifyToken, assignBuffetMenu);

module.exports = router;
