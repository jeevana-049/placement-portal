const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Models
const User = require("./models/User");
const Experience = require("./models/Experience");
const Question = require("./models/Question");

// ================= DATABASE =================

// ✅ USE ENV VARIABLE (IMPORTANT)
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database Connected ✅"))
.catch((err) => {
  console.log("❌ DB ERROR:");
  console.log(err.message);
});

// ================= ROUTES =================

// Test route
app.get("/test", (req, res) => {
  res.send("Server + Database working 🚀");
});

// ================= AUTH =================

// Register
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User Registered Successfully ✅");
  } catch (err) {
    res.send("Error: " + err);
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== req.body.password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // ✅ SEND ROLE
    res.json({
      email: user.email,
      role: user.role
    });

  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

// ================= EXPERIENCES =================

// Upload experience
app.post("/experience", async (req, res) => {
  try {
    const exp = new Experience({
      ...req.body,
      status: "pending"   // default
    });

    await exp.save();
    res.send("Experience submitted for approval ✅");
  } catch (err) {
    res.send("Error: " + err);
  }
});

// Get approved experiences
app.get("/experiences", async (req, res) => {
  try {
    const data = await Experience.find({ status: "approved" });
    res.json(data);
  } catch (err) {
    res.send(err);
  }
});

// ================= ADMIN =================

// Get all experiences (admin)
app.get("/admin/experiences", async (req, res) => {
  const data = await Experience.find();
  res.json(data);
});

// Approve experience
app.put("/admin/approve/:id", async (req, res) => {
  try {
    await Experience.findByIdAndUpdate(req.params.id, {
      status: "approved"
  }); catch (err) {
    res.send("Approved ✅");
  }
});

// Delete experience
app.delete("/admin/delete/:id", async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.send("Deleted ❌");
});

// ================= QUESTIONS =================

// Add question
app.post("/admin/add-question", async (req, res) => {
  const { category, question } = req.body;
  await Question.create({ category, question });
  res.send("Question added");
});

// Get questions
app.get("/questions/:category", async (req, res) => {
  const data = await Question.find({ category: req.params.category });
  res.json(data);
});

// Delete question
app.delete("/admin/delete-question/:id", async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});