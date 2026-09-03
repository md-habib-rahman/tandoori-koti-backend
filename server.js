require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Tandoori Koti API is running" });
});

// Attach the authentication routes
app.use("/api/auth", require("./src/routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
