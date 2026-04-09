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
        "https://placement-backend.onrender.com/experiences"
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />

      <h2 style={{ textAlign: "center" }}>Experiences</h2>

      {data.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>
          No experiences yet (or not approved)
        </h3>
      ) : (
        data.map((exp, index) => (
          <div key={index} style={styles.card}>
            <h3>{exp.company}</h3>
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
  card: {
    margin: "20px",
    padding: "20px",
    background: "#f1f5f9",
    borderRadius: "10px",
  },
};

export default Dashboard;