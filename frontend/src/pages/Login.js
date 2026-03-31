import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
  if (user.email && user.password) {
    
    // 👑 Simple admin logic
    const role = user.email === "admin@gmail.com" ? "admin" : "user";

    localStorage.setItem("user", JSON.stringify({ ...user, role }));

    alert("Login Successful ✅");
    navigate("/dashboard");
  } else {
    alert("Enter details!");
  }
};

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.box}>
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#1e3c72,#2a5298)",
  },
  box: {
    width: "400px",
    margin: "100px auto",
    padding: "30px",
    background: "white",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
};

export default Login;