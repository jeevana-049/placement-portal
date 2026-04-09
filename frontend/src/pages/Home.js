import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { themes, cardStyle } from "../styles/theme";

function Home() {
  const navigate = useNavigate();
  const theme = themes.home;

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: "white" }}>
      <Navbar />

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          🚀 Placement Analytics & Peer Knowledge Portal
        </h1>

        <p style={styles.subtitle}>
          A full-stack platform designed to centralize interview experiences,
          curated study resources, and peer-driven insights to help students
          prepare smarter for placements.
        </p>

        <div style={styles.buttons}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/studyhub")}
          >
            Explore Study Hub
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>✨ Key Features</h2>

        <div style={styles.grid}>
          <div style={cardStyle()}>📊 Real Interview Experiences</div>
          <div style={cardStyle()}>📚 Structured Study Hub</div>
          <div style={cardStyle()}>🎯 Important Questions & Tips</div>
          <div style={cardStyle()}>👥 Peer Knowledge Sharing</div>
        </div>
      </div>

      {/* WHY THIS PROJECT */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>💡 Why This Platform?</h2>

        <p style={styles.text}>
          Students often struggle with scattered preparation resources and lack
          of real interview insights. This platform solves that by bringing
          everything into one structured and accessible ecosystem.
        </p>
      </div>

      {/* TECH STACK */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>⚙️ Tech Stack</h2>

        <div style={styles.grid}>
          <div style={cardStyle()}>Frontend: React.js</div>
          <div style={cardStyle()}>Backend: Node.js + Express</div>
          <div style={cardStyle()}>Database: MongoDB</div>
          <div style={cardStyle()}>Deployment: Render + Netlify</div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <p>© 2026 Placement Portal | Built for student success 🚀</p>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    textAlign: "center",
    padding: "80px 20px",
  },

  title: {
    fontSize: "42px",
    marginBottom: "15px",
  },

  subtitle: {
    fontSize: "18px",
    maxWidth: "750px",
    margin: "auto",
    opacity: "0.9",
  },

  buttons: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },

  primaryBtn: {
    padding: "14px 30px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#00c6ff",
    color: "white",
    boxShadow: "0 0 10px #00c6ff",
  },

  secondaryBtn: {
    padding: "14px 30px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid white",
    cursor: "pointer",
    background: "transparent",
    color: "white",
  },

  section: {
    padding: "40px 20px",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: "28px",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    width: "80%",
    margin: "auto",
  },

  text: {
    maxWidth: "700px",
    margin: "auto",
    fontSize: "17px",
    opacity: "0.9",
  },

  footer: {
    marginTop: "40px",
    padding: "20px",
    textAlign: "center",
    opacity: "0.7",
  },
};

export default Home;