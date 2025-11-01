import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrowseMaterials from "./pages/BrowseMaterials";
import UploadMaterial from "./pages/UploadMaterial";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-gray-900">
        <Navbar />
        <main className="p-4 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<BrowseMaterials />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<UploadMaterial />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
