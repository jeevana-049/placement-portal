const mongoose = require("mongoose");

const expSchema = new mongoose.Schema({
  company: String,
  rounds: String,
  technicalQuestions: String,
  hrQuestions: String,
  tips: String,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Experience", expSchema);