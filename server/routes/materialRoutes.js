import express from "express";
import multer from "multer";
import Material from "../models/material.js";

const router = express.Router();

// 🗂️ Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // files saved to /uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// 📤 Upload Route
router.post("/upload", upload.single("file"), async (req, res) => {
  const { title, subject, uploadedBy } = req.body;
  const fileUrl = `/uploads/${req.file.filename}`;

  try {
    const newMaterial = new Material({ title, subject, uploadedBy, fileUrl });
    await newMaterial.save();
    res.status(201).json({ message: "File uploaded", material: newMaterial });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
});

// ✅ 📄 GET Route for all study materials
router.get("/", async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch materials" });
  }
});

export default router;
