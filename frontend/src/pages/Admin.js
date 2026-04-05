import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Admin() {
  const [data, setData] = useState({
    topic: "aptitude",
    question: "",
    tip: "",
  });

  const [questions, setQuestions] = useState([]);

  // 🔄 FETCH ALL QUESTIONS
  const fetchQuestions = async () => {
    try {
      const res = await axios.get("https://placement-portal-v7e6.onrender.com/questions");
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // ➕ ADD QUESTION
  const addQuestion = async () => {
    try {
      await axios.post("https://placement-portal-v7e6.onrender.com/question", data);
      alert("Added ✅");

      setData({ topic: "aptitude", question: "", tip: "" });
      fetchQuestions(); // refresh list
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ DELETE QUESTION
  const deleteQuestion = async (id) => {
    try {
      await axios.delete(`https://placement-portal-v7e6.onrender.com/question/${id}`);
      alert("Deleted ❌");
      fetchQuestions();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.box}>
        <h2>Admin Panel 👑</h2>

        {/* SELECT TOPIC */}
        <select
          value={data.topic}
          onChange={(e) =>
            setData({ ...data, topic: e.target.value })
          }
        >
          <option value="aptitude">Aptitude</option>
          <option value="coding">Coding</option>
          <option value="core">Core</option>
          <option value="interview">Interview</option>
        </select>

        {/* QUESTION INPUT */}
        <input
          placeholder="Enter question"
          value={data.question}
          onChange={(e) =>
            setData({ ...data, question: e.target.value })
          }
        />

        {/* TIP INPUT */}
        <input
          placeholder="Enter tip (optional)"
          value={data.tip}
          onChange={(e) =>
            setData({ ...data, tip: e.target.value })
          }
        />

        <button onClick={addQuestion}>Add Question</button>
      </div>

      {/* SHOW QUESTIONS */}
      <div style={styles.list}>
        {questions.length === 0 ? (
          <p>No questions yet</p>
        ) : (
          questions.map((q) => (
            <div key={q._id} style={styles.card}>
              <p>📌 {q.question}</p>
              {q.tip && <p>💡 {q.tip}</p>}

              <button onClick={() => deleteQuestion(q._id)}>
                Delete ❌
              </button>
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

  box: {
    width: "350px",
    margin: "40px auto",
    background: "white",
    color: "black",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  list: {
    padding: "20px",
  },

  card: {
    background: "rgba(255,255,255,0.1)",
    padding: "15px",
    margin: "10px",
    borderRadius: "10px",
  },
};

export default Admin;