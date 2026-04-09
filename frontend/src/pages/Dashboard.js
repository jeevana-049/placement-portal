import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(
        "https://placement-portal-v7e6.onrender.com/experiences"
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <h2 style={styles.heading}>All Experiences</h2>

      {data.length === 0 ? (
        <h3 style={styles.msg}>
          No experiences yet (or not approved)
        </h3>
      ) : (
        data.map((exp, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.company}>{exp.company}</h3>
            <p><b>Rounds:</b> {exp.rounds}</p>
            <p><b>Technical:</b> {exp.technicalQuestions}</p>
            <p><b>HR:</b> {exp.hrQuestions}</p>
            <p><b>Tips:</b> {exp.tips}</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#1e3c72,#2a5298)",
    paddingBottom: "40px",
    color: "white",
  },
  heading: {
    textAlign: "center",
    marginTop: "20px",
  },
  msg: {
    textAlign: "center",
    marginTop: "50px",
    color: "#ffcc00",
  },
  card: {
    width: "60%",
    margin: "20px auto",
    padding: "20px",
    background: "white",
    color: "black",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  company: {
    color: "#2a5298",
  },
};

export default Dashboard;