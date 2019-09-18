const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, trim: true, unique: true },
  fname: { type: String, default: "Not Set" },
  lname: { type: String, default: "Not Set" },
  email: String,
  password: String,
  city: {
    type: String,
    default: "Not Provided"
  },
  country: {
    type: String,
    default: "Not Provided"
  },
  zip: {
    type: Number,
    default: 0000
  },
  address: {
    type: String,
    default: "Not provided"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("users", UserSchema);
