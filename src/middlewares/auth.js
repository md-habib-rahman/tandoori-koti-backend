import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    // 1. Check for the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    // 2. Extract the token
    const token = authHeader.split(" ")[1];

    // 3. Verify the token against your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the decoded payload (adminId, username) to the request object
    req.admin = decoded;

    // 5. Proceed to the next middleware or controller
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Session expired. Please log in again." });
    }

    return res.status(403).json({ error: "Invalid token." });
  }
};

export default verifyToken;
