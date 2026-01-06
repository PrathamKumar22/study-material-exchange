import { useEffect, useState } from "react";
import axios from "axios";
import "./BrowseMaterials.css"; 

export default function BrowseMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get("http://study-material-exchange.onrender.com/api/materials");
      setMaterials(res.data);
    } catch (err) {
      console.error("Failed to fetch materials", err);
    } finally {
      setLoading(false);
    }
  };

  const getFileExtension = (url = "") => url.split(".").pop().toLowerCase();

  const getFileIcon = (url) => {
    const ext = getFileExtension(url);
    switch (ext) {
      case "pdf": return "📄";
      case "doc":
      case "docx": return "📝";
      case "ppt":
      case "pptx": return "📊";
      case "xls":
      case "xlsx": return "📈";
      case "jpg":
      case "jpeg":
      case "png": return "🖼️";
      default: return "📚";
    }
  };

  return (
    <main className="browse-main">
      <h1 className="browse-title">📚 Study Exchange</h1>

      {loading ? (
        <p className="browse-loading">Loading study materials...</p>
      ) : materials.length === 0 ? (
        <p className="browse-empty">No study materials found.</p>
      ) : (
        <section className="browse-grid">
          {materials.map(({ _id, title, subject, uploadedBy, fileUrl }) => (
            <article key={_id} className="browse-card">
              <div>
                <h2 className="material-title">{title || "Untitled"}</h2>
                <p className="material-meta">
                  Subject: <span>{subject || "N/A"}</span>
                </p>
                <p className="material-meta">
                  Uploaded by: <span>{uploadedBy || "Anonymous"}</span>
                </p>
              </div>

              <a
                href={`http://study-material-exchange.onrender.com${fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-btn"
              >
                {getFileIcon(fileUrl)} View File
              </a>

              <span className="file-icon">{getFileIcon(fileUrl)}</span>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
