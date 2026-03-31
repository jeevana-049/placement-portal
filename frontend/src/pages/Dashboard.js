import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setLoggedIn(true);
      fetchExperiences();
    }
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await axios.get("http://localhost:5000/experiences");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <h2 style={styles.heading}>Interview Experiences</h2>

      {!loggedIn ? (
        <h3 style={styles.msg}>🔒 Login to view experiences</h3>
      ) : (
        <div style={styles.grid}>
          {data.length === 0 ? (
            <p>No experiences yet</p>
          ) : (
            data.map((exp, i) => (
              <div key={i} style={styles.card}>
                <h3>{exp.company}</h3>
                <p><b>Rounds:</b> {exp.rounds}</p>
                <p><b>Technical:</b> {exp.technicalQuestions}</p>
                <p><b>HR:</b> {exp.hrQuestions}</p>
                <p><b>Tips:</b> {exp.tips}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#141e30,#243b55)",
    color: "white",
  },
  heading: {
    textAlign: "center",
    marginTop: "20px",
  },
  msg: {
    textAlign: "center",
    marginTop: "40px",
    color: "#ffcc00",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    background: "rgba(255,255,255,0.1)",
    padding: "20px",
    borderRadius: "15px",
  },
};

export default Dashboard;