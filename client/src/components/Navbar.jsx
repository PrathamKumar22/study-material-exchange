import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  };

  const brandStyle = {
    fontWeight: "700",
    fontSize: "1.5rem",
    color: "#f39c12",
    textDecoration: "none",
  };

  const linkContainerStyle = {
    display: "flex",
    gap: "24px",
  };

  const linkStyle = {
    color: "#ecf0f1",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "1rem",
    padding: "6px 12px",
    borderRadius: "4px",
    transition: "background-color 0.3s ease, color 0.3s ease",
    cursor: "pointer",
  };

  const hoverStyle = {
    backgroundColor: "#f39c12",
    color: "#2c3e50",
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={brandStyle}>
          StudyExchange 📚
        </Link>
      </div>

      <div style={linkContainerStyle}>
        {user ? (
          <>
            <Link
              to="/upload"
              style={linkStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
            >
              Upload
            </Link>
            <span
              onClick={handleLogout}
              style={linkStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
            >
              Logout
            </span>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={linkStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={linkStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
