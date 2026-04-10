import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    rounds: "",
    technicalQuestions: "",
    hrQuestions: "",
    tips: "",
  });

  // 🔐 CHECK LOGIN
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setLoggedIn(true);
  }, []);

  // 📤 SUBMIT FUNCTION
  const handleSubmit = async () => {
    try {
      if (!form.company || !form.rounds) {
        alert("Please fill required fields");
        return;
      }

      await axios.post(
        "https://placement-portal-v7e6.onrender.com/experience",
        form
      );

      alert("Uploaded Successfully ✅");

      // reset form
      setForm({
        company: "",
        rounds: "",
        technicalQuestions: "",
        hrQuestions: "",
        tips: "",
      });

      // ✅ redirect AFTER success
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Upload failed ❌");
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <h2 style={styles.heading}>Upload Experience</h2>

      {!loggedIn ? (
        <h3 style={styles.msg}>🔒 Login to upload experience</h3>
      ) : (
        <div style={styles.box}>
          
          <input
            style={styles.input}
            placeholder="Company Name"
            value={form.company}
            onChange={(e) =>
              setForm({ ...form, company: e.target.value })
            }
          />

          <input
            style={styles.input}
            placeholder="Number of Rounds"
            value={form.rounds}
            onChange={(e) =>
              setForm({ ...form, rounds: e.target.value })
            }
          />

          <textarea
            style={styles.textarea}
            placeholder="Technical Questions"
            value={form.technicalQuestions}
            onChange={(e) =>
              setForm({ ...form, technicalQuestions: e.target.value })
            }
          />

          <textarea
            style={styles.textarea}
            placeholder="HR Questions"
            value={form.hrQuestions}
            onChange={(e) =>
              setForm({ ...form, hrQuestions: e.target.value })
            }
          />

          <textarea
            style={styles.textarea}
            placeholder="Tips / Suggestions"
            value={form.tips}
            onChange={(e) =>
              setForm({ ...form, tips: e.target.value })
            }
          />

          <button style={styles.button} onClick={handleSubmit}>
            Submit 🚀
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#1e3c72",
    color: "white",
  },
  heading: {
    textAlign: "center",
    marginTop: "20px",
  },
  msg: {
    textAlign: "center",
    marginTop: "50px",
  },
  box: {
    width: "400px",
    margin: "40px auto",
    padding: "25px",
    background: "white",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Upload;