import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.hero}>
        <h1 style={styles.title}>
          Placement Analytics & Peer-Knowledge Portal 🚀
        </h1>

        <p style={styles.subtitle}>
          A centralized platform to access real interview experiences, 
          important questions, and structured preparation resources.
        </p>

        <div style={styles.features}>
          <div style={styles.card}>📊 Real Interview Experiences</div>
          <div style={styles.card}>📚 Study Hub (Aptitude, Coding, Core)</div>
          <div style={styles.card}>🎯 Important Questions & Tips</div>
          <div style={styles.card}>👥 Learn from Peer Knowledge</div>
        </div>

        <div style={styles.buttons}>
          <button style={styles.btn} onClick={() => navigate("/login")}>
  Get Started
</button>

<button style={styles.btn} onClick={() => navigate("/studyhub")}>
  Explore Study Hub
</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#1e3c72,#2a5298)",
    color: "white",
  },

  hero: {
    textAlign: "center",
    padding: "60px 20px",
  },

  title: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "18px",
    maxWidth: "700px",
    margin: "auto",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginTop: "40px",
    padding: "20px",
  },

  card: {
    background: "rgba(255,255,255,0.1)",
    padding: "20px",
    borderRadius: "12px",
  },

  buttons: {
  marginTop: "30px",
  display: "flex",
  justifyContent: "center",
  gap: "20px",
},

btn: {
  padding: "14px 28px",
  fontSize: "16px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  background: "#56c566",
  color: "white",
},
};

export default Home;