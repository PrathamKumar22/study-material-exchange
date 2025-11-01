import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import materialRoutes from "./routes/materialRoutes.js"; // ✅ Import study material routes



dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);          // ✅ User routes
app.use("/api/materials", materialRoutes);  // ✅ Material routes

// ✅ Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () => {
      console.log("🚀 Server is running at http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
  });
