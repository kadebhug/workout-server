const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  name: String,
  src: String,
  thumbnail: String,
  meta: String,
});

module.exports = mongoose.model("Media", mediaSchema);