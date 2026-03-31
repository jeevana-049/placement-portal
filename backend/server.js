const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const User = require("./models/User");
const Experience = require("./models/Experience");
const Question = require("./models/Question");

// connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/placementDB")
.then(() => console.log("Database Connected ✅"))
.catch((err) => console.log(err));

// route
app.get("/", (req, res) => {
  res.send("Server + Database working 🚀");
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User Registered Successfully ✅");
  } catch (err) {
    res.send("Error: " + err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.send("User not found ❌");
    }

    if (user.password === req.body.password) {
      res.send("Login successful ✅");
    } else {
      res.send("Wrong password ❌");
    }

  } catch (err) {
    res.send("Error: " + err);
  }
});

app.post("/experience", async (req, res) => {
  try {
    const exp = new Experience(req.body);
    await exp.save();
    res.send("Experience submitted for approval ✅");
  } catch (err) {
    res.send("Error: " + err);
  }
});
app.get("/experiences", async (req, res) => {
  const data = await Experience.find({ status: "approved" });
  res.json(data);
});
app.put("/approve/:id", async (req, res) => {
  try {
    await Experience.findByIdAndUpdate(req.params.id, {
      status: "approved"
    });
    res.send("Approved ✅");
  } catch (err) {
    res.send("Error: " + err);
  }
});
// GET all experiences (including pending)
app.get("/admin/experiences", async (req, res) => {
  const data = await Experience.find();
  res.json(data);
});

// APPROVE
app.put("/admin/approve/:id", async (req, res) => {
  await Experience.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.send("Approved ✅");
});

// DELETE
app.delete("/admin/delete/:id", async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.send("Deleted ❌");
});

app.post("/add-question", async (req, res) => {
  const { category, question } = req.body;

  await Question.create({ category, question });

  res.send("Question added");
});
app.get("/questions/:category", async (req, res) => {
  const data = await Question.find({ category: req.params.category });
  res.json(data);
});
app.delete("/delete-question/:id", async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});