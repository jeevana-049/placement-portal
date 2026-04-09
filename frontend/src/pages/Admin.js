import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { themes, cardStyle } from "../styles/theme";

function Admin() {
  const [experiences, setExperiences] = useState([]);
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("aptitude");
  const [questions, setQuestions] = useState([]);

  const theme = themes.admin;

  useEffect(() => {
    fetchExperiences();
    fetchQuestions();
    // eslint-disable-next-line
  }, [category]);

  // 📥 GET EXPERIENCES
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

  // 📥 GET QUESTIONS
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        `https://placement-portal-v7e6.onrender.com/questions/${category}`
      );
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ APPROVE
  const approve = async (id) => {
    try {
      await axios.put(
        `https://placement-portal-v7e6.onrender.com/admin/approve/${id}`
      );
      alert("Approved ✅");
      fetchExperiences();
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ DELETE EXPERIENCE
  const remove = async (id) => {
    try {
      await axios.delete(
        `https://placement-portal-v7e6.onrender.com/admin/delete/${id}`
      );
      fetchExperiences();
    } catch (err) {
      console.log(err);
    }
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
    fetchQuestions();
  };

  // ❌ DELETE QUESTION
  const deleteQuestion = async (id) => {
    try {
      await axios.delete(
        `https://placement-portal-v7e6.onrender.com/admin/delete-question/${id}`
      );
      alert("Deleted ✅");
      fetchQuestions();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ ...styles.container, background: theme.bg }}>
      <Navbar />

      <h2 style={styles.heading}>Admin Panel</h2>

      {/* ADD QUESTION */}
      <div style={{ ...styles.box, boxShadow: `0 0 20px ${theme.glow}` }}>
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

      {/* QUESTIONS LIST */}
      <h3 style={styles.heading}>Manage Questions</h3>

      {questions.map((q) => (
        <div key={q._id} style={cardStyle()}>
          <p>{q.question}</p>

          <button
            onClick={() => deleteQuestion(q._id)}
            style={styles.delete}
          >
            Delete ❌
          </button>
        </div>
      ))}

      {/* EXPERIENCES */}
      <h3 style={styles.heading}>Manage Experiences</h3>

      {experiences.map((exp) => (
        <div key={exp._id} style={cardStyle()}>
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
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
  },

  textarea: {
    padding: "10px",
    borderRadius: "8px",
  },

  button: {
    background: "#00c6ff",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    boxShadow: "0 0 10px #00c6ff",
    cursor: "pointer",
  },

  approve: {
    background: "#00ff9f",
    color: "black",
    padding: "8px",
    border: "none",
    borderRadius: "8px",
    marginRight: "10px",
    boxShadow: "0 0 10px #00ff9f",
    cursor: "pointer",
  },

  delete: {
    background: "#ff4d4d",
    color: "white",
    padding: "8px",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 0 10px #ff4d4d",
    cursor: "pointer",
  },
};

export default Admin;