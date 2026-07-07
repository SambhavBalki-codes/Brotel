const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["guest", "host"], required: true ,default: "guest"},
});
``
// Create a Mongoose model for the User schema.
// This model will be used to interact with the "users" collection in MongoDB.
module.exports = mongoose.model("User", userSchema);
