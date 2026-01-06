import express from "express";
import multer from "multer";
import Material from "../models/material.js";

const router = express.Router();

// 🗂️ Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// ✅ Multer upload with file size limit (5MB)
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
});

// 📤 UPLOAD STUDY MATERIAL
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // 🔴 IMPORTANT CHECK
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title, subject, uploadedBy } = req.body;

    const fileUrl = `/uploads/${req.file.filename}`;

    const newMaterial = new Material({
      title,
      subject,
      uploadedBy,
      fileUrl
    });

    await newMaterial.save();

    res.status(201).json({
      message: "File uploaded successfully",
      material: newMaterial
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: "Upload failed" });
  }
});

// 📄 GET ALL MATERIALS
router.get("/", async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch materials" });
  }
});

export default router;
