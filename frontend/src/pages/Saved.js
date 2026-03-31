import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

function Saved() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("saved")) || [];
    setSaved(data);
  }, []);

  return (
    <div style={styles.container}>
      <Navbar />

      <h2 style={styles.heading}>Saved Experiences ⭐</h2>

      <div style={styles.grid}>
        {saved.length === 0 ? (
          <p>No saved items</p>
        ) : (
          saved.map((exp, i) => (
            <div key={i} style={styles.card}>
              <h3>{exp.company}</h3>
              <p>{exp.rounds}</p>
              <p>{exp.technicalQuestions}</p>
              <p>{exp.hrQuestions}</p>
              <p>{exp.tips}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#141e30,#243b55)",
    color: "white",
  },
  heading: { textAlign: "center", marginTop: "20px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    background: "rgba(255,255,255,0.1)",
    padding: "20px",
    borderRadius: "10px",
  },
};

export default Saved;