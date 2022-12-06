const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  display: String,
  code: String
});

module.exports = mongoose.model("Role", roleSchema);