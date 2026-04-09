import { useNavigate } from "react-router-dom";
import { FaHome, FaBook, FaUpload, FaBriefcase, FaStar, FaUserShield } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  // ✅ ONLY ONE TIME
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>
      
      <div style={styles.left}>
        <h2 style={styles.logo} onClick={() => navigate("/")}>
          🚀 Placement Portal
        </h2>

        <button style={styles.btn} onClick={() => navigate("/")}>
          <FaHome size={18}/> Home
        </button>

        <button style={styles.btn} onClick={() => navigate("/dashboard")}>
          <FaBriefcase size={18}/> Experiences
        </button>

        <button style={styles.btn} onClick={() => navigate("/studyhub")}>
          <FaBook size={18}/> Study Hub
        </button>

        <button style={styles.btn} onClick={() => navigate("/upload")}>
          <FaUpload size={18}/> Upload
        </button>

        <button style={styles.btn} onClick={() => navigate("/saved")}>
          <FaStar size={18}/> Saved
        </button>

        {/* 👑 ADMIN ONLY */}
        {user?.role === "admin" && (
          <button style={styles.btn} onClick={() => navigate("/admin")}>
            <FaUserShield size={18}/> Admin
          </button>
        )}
      </div>

      {/* RIGHT SIDE */}
      {user && (
        <button style={styles.logout} onClick={handleLogout}>
          Logout 🚪
        </button>
      )}
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#1e293b",
    color: "white",
  },

  left: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },

  logo: {
    cursor: "pointer",
  },

  btn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 16px",
    borderRadius: "10px",
    background: "#334155",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
  },

  logout: {
    background: "#ef4444",
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};

export default Navbar;