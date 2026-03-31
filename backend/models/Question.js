const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  category: String,   // aptitude / coding / core / interview
  question: String,
});

module.exports = mongoose.model("Question", questionSchema);