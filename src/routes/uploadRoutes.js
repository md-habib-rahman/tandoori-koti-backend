const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { verifyToken } = require("../middlewares/auth");
const { uploadImage } = require("../controllers/uploadController");

// Protect the route and process a single file field named 'image'
router.post("/", verifyToken, upload.single("image"), uploadImage);

module.exports = router;
