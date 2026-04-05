import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function StudyContent() {
  const { topic } = useParams(); // aptitude / coding / core / interview
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        `https://placement-portal-v7e6.onrender.com/questions/${topic}`
      );
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchQuestions();
}, [topic]);

  return (
    <div>
      <Navbar />

      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        {topic.toUpperCase()} Questions
      </h2>

      <div style={{ padding: "20px" }}>
        {questions.length === 0 ? (
          <p>No questions available</p>
        ) : (
          questions.map((q) => (
            <div key={q._id} style={styles.card}>
              {q.question}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "15px",
    margin: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
};

export default StudyContent;