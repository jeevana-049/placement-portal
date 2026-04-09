import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Admin() {
  const [experiences, setExperiences] = useState([]);
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("aptitude");

  useEffect(() => {
    fetchExperiences();
  }, []);

  // 📥 GET ALL EXPERIENCES
  const fetchExperiences = async () => {
    try {
      const res = await axios.get(
        "https://placement-portal-v7e6.onrender.com/admin/experiences"
      );
      setExperiences(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ APPROVE
  const approve = async (id) => {
    await axios.put(
      `https://placement-portal-v7e6.onrender.com/admin/approve/${id}`
    );
    fetchExperiences();
  };

  // ❌ DELETE
  const remove = async (id) => {
    await axios.delete(
      `https://placement-portal-v7e6.onrender.com/admin/delete/${id}`
    );
    fetchExperiences();
  };

  // ➕ ADD QUESTION
  const addQuestion = async () => {
    if (!question) {
      alert("Enter question");
      return;
    }

    await axios.post(
      "https://placement-portal-v7e6.onrender.com/add-question",
      { category, question }
    );

    alert("Question Added ✅");
    setQuestion("");
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <h2 style={styles.heading}>Admin Panel</h2>

      {/* ADD QUESTION */}
      <div style={styles.box}>
        <h3>Add StudyHub Question</h3>

        <select
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        >
          <option value="aptitude">Aptitude</option>
          <option value="coding">Coding</option>
          <option value="core">Core</option>
          <option value="interview">Interview</option>
        </select>

        <textarea
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={addQuestion} style={styles.button}>
          Add Question
        </button>
      </div>

      {/* EXPERIENCES */}
      <h3 style={styles.heading}>Manage Experiences</h3>

      {experiences.map((exp) => (
        <div key={exp._id} style={styles.card}>
          <h4>{exp.company}</h4>
          <p>{exp.rounds}</p>

          <button onClick={() => approve(exp._id)} style={styles.approve}>
            Approve ✅
          </button>

          <button onClick={() => remove(exp._id)} style={styles.delete}>
            Delete ❌
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#1e3c72,#2a5298)",
    color: "white",
    paddingBottom: "40px",
  },
  heading: {
    textAlign: "center",
    marginTop: "20px",
  },
  box: {
    width: "400px",
    margin: "20px auto",
    padding: "20px",
    background: "white",
    color: "black",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
  },
  textarea: {
    padding: "10px",
  },
  button: {
    background: "#4caf50",
    color: "white",
    padding: "10px",
    border: "none",
  },
  card: {
    background: "white",
    color: "black",
    margin: "15px auto",
    padding: "15px",
    width: "60%",
    borderRadius: "10px",
  },
  approve: {
    background: "green",
    color: "white",
    marginRight: "10px",
    padding: "8px",
    border: "none",
  },
  delete: {
    background: "red",
    color: "white",
    padding: "8px",
    border: "none",
  },
};

export default Admin;