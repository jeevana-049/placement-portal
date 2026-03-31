import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Upload() {
  const [loggedIn, setLoggedIn] = useState(false);

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
window.location.href = "/dashboard";
      await axios.post("http://localhost:5000/experience", form);

      alert("Uploaded Successfully ✅");

      // reset form
      setForm({
        company: "",
        rounds: "",
        technicalQuestions: "",
        hrQuestions: "",
        tips: "",
      });

    } catch (err) {
      console.log(err);
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
          
          <textarea
            style={styles.textarea}
            placeholder="Company Name"
            value={form.company}
            onChange={(e) =>
              setForm({ ...form, company: e.target.value })
            }
          />

          <textarea
            style={styles.textarea}
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
    background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
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

  box: {
    width: "450px",
    margin: "40px auto",
    padding: "30px",
    background: "white",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "4px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    width: "100%",
  },

  textarea: {
    padding: "16px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },

  button: {
    padding: "14px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    background: "#5a67d8",
    color: "white",
    cursor: "pointer",
  },
};

export default Upload;