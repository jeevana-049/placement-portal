import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { themes, cardStyle } from "../styles/theme";

function Dashboard() {
  const [experiences, setExperiences] = useState([]); // ✅ FIXED

  const theme = themes.dashboard;

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(
        "https://placement-portal-v7e6.onrender.com/experiences"
      );
      setExperiences(res.data); // ✅ FIXED
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.bg }}>
      <Navbar />

      <h2 style={{ textAlign: "center", color: "white" }}>
        Experiences
      </h2>

      {experiences.length === 0 ? (
        <p style={{ textAlign: "center", color: "white" }}>
          No experiences yet...
        </p>
      ) : (
        experiences.map((exp) => (
          <div key={exp._id} style={cardStyle()}>
            <h3>{exp.company}</h3>
            <p>{exp.rounds}</p>
            <p>{exp.technicalQuestions}</p>
            <p>{exp.hrQuestions}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;