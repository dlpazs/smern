const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fName: {
    type: String,
    trim: true
  },
  lName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid -email address"]
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password should be longer."
    ]
  },
  createdAt: {
    type: Date
  }
});

module.exports = User = mongoose.model("User", UserSchema);
