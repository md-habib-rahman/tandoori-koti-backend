import express from "express";
// import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import menuRoutes from "./src/routes/menuRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Tandoori Koti API is running" });
});

// Attach the authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Welcome to the Tandoori Koti API",
    timestamp: new Date(),
  });
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export default app;
