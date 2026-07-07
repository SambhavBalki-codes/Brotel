const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  photo: {
    type: String
  },
  description: {
    type: String,
  }
});

module.exports = mongoose.model("Home", homeSchema);