const mongoose = require("mongoose");

const exerciseTypeSchema = new mongoose.Schema({
  display: String,
  code: String
});

module.exports = mongoose.model("ExerciseType", exerciseTypeSchema);