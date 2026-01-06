import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UploadMaterial.css";

function UploadMaterial() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    uploadedBy: "",
    file: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData((prev) => ({ ...prev, uploadedBy: user.name }));
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("subject", formData.subject);
    data.append("uploadedBy", formData.uploadedBy);
    data.append("file", formData.file);

    try {
      await axios.post("http://study-material-exchange.onrender.com/api/materials/upload", data);
      navigate("/");
    } catch (err) {
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="upload-container">
      <button onClick={() => navigate("/")} className="upload-back">
        ← 
      </button>

      <form
        onSubmit={handleSubmit}
        className="upload-form"
        encType="multipart/form-data"
      >
        <h2 className="upload-heading">📤 Upload Study Material</h2>

        <div className="upload-field">
          <label className="upload-label">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Eg: Class 10 Physics Notes"
            required
            className="upload-input"
          />
        </div>

        <div className="upload-field">
          <label className="upload-label">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Eg: Physics"
            required
            className="upload-input"
          />
        </div>

        <div className="upload-field">
          <label className="upload-label">Your Name</label>
          <input
            type="text"
            name="uploadedBy"
            value={formData.uploadedBy}
            onChange={handleChange}
            placeholder="Your full name"
            required
            className="upload-input"
          />
        </div>

        <div className="upload-field">
          <label className="upload-label">File</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="upload-input-file"
            required
          />
        </div>

        <button type="submit" className="upload-button">
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadMaterial;
