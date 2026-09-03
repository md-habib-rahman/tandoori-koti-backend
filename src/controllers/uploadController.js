const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided." });
    }

    // Convert the memory buffer to a Base64 Data URI
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload directly to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "tandoori_koti_menu",
    });

    res.status(200).json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Image upload failed." });
  }
};

module.exports = { uploadImage };
