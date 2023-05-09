const mongoose = require("mongoose");

const focusSchema = new mongoose.Schema({
  display: String,
  code: String
});

module.exports = mongoose.model("Focus", focusSchema);