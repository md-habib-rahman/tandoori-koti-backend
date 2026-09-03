const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../config/db");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // 1. Find the admin in Neon DB
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 2. Verify the hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 3. Generate JWT (Valid for 7 days)
    const token = jwt.sign(
      { adminId: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // 4. Send token back (Frontend will store this securely)
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  login,
};
