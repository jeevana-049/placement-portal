import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function StudyHub() {
  const navigate = useNavigate();

  const topics = [
    { name: "Aptitude", path: "/study/aptitude" },
    { name: "Coding", path: "/study/coding" },
    { name: "Core Subjects", path: "/study/core" },
    { name: "Interview Questions", path: "/study/interview" },
  ];

  return (
    <div style={styles.container}>
      <Navbar />

      <h1 style={styles.heading}>Study Hub 📚</h1>

      <div style={styles.grid}>
        {topics.map((item, i) => (
          <div
            key={i}
            style={styles.card}
            onClick={() => navigate(item.path)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <h2>{item.name}</h2>
            <p>Click to explore questions →</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    color: "white",
  },

  heading: {
    textAlign: "center",
    marginTop: "40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    padding: "40px",
  },

  card: {
    background: "rgba(255,255,255,0.1)",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    transition: "0.3s",
    cursor: "pointer",
  },
};

export default StudyHub;