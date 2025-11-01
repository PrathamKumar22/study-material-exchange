// server/models/Material.js
import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  fileUrl: { type: String, required: true }, // assuming you're uploading files to cloud
  uploadedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Material', materialSchema);
