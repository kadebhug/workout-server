const mongoose = require("mongoose");

const muscleGroupSchema = new mongoose.Schema({
  display: String,
  code: String
});

module.exports = mongoose.model("MuscleGroup", muscleGroupSchema);