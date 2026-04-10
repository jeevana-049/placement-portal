import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { themes, cardStyle } from "../styles/theme";

function Dashboard() {
  const [experiences, setExperiences] = useState([]);
  const [search, setSearch] = useState(""); // ✅ NEW

  const theme = themes.dashboard;

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(
        "https://placement-portal-v7e6.onrender.com/experiences"
      );
      setExperiences(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ SAVE FUNCTION
  const saveExp = (exp) => {
    let saved = JSON.parse(localStorage.getItem("saved")) || [];

    // avoid duplicates
    const exists = saved.find((item) => item._id === exp._id);
    if (exists) {
      alert("Already saved ⭐");
      return;
    }

    saved.push(exp);
    localStorage.setItem("saved", JSON.stringify(saved));

    alert("Saved Successfully ⭐");
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.bg }}>
      <Navbar />

      <h2 style={{ textAlign: "center", color: "white" }}>
        Experiences
      </h2>

      {/* ✅ SEARCH BAR */}
      <input
        type="text"
        placeholder="Search by company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          display: "block",
          margin: "20px auto",
          padding: "10px",
          width: "300px",
          borderRadius: "8px",
          border: "none",
        }}
      />

      {experiences.length === 0 ? (
        <p style={{ textAlign: "center", color: "white" }}>
          No experiences yet...
        </p>
      ) : (
        experiences
          .filter((exp) =>
            exp.company.toLowerCase().includes(search.toLowerCase())
          )
          .map((exp) => (
            <div key={exp._id} style={cardStyle()}>
              <h3>{exp.company}</h3>
              <p>{exp.rounds}</p>
              <p>{exp.technicalQuestions}</p>
              <p>{exp.hrQuestions}</p>

              {/* ✅ SAVE BUTTON */}
              <button
                onClick={() => saveExp(exp)}
                style={{
                  marginTop: "10px",
                  padding: "8px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Save ⭐
              </button>
            </div>
          ))
      )}
    </div>
  );
}

export default Dashboard;