const express = require("express");
const { isEmpty } = require("lodash");
const User = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    return res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

router.post("/", async (req, res) => {
  if (isEmpty(req.body)) {
    return res.status(403).json({
      message: "Body should not be empty"
    });
  }
  const { fName, lName, email, password } = req.body;
  const newUser = new User({
    fName,
    lName,
    email,
    password,
    createdAt: Date.now()
  });
  try {
    await newUser.save();
    res.json({
      message: "Successfully saved",
      fName,
      lName,
      email
    });
  } catch (err) {
    console.log("Error:", err);
    res.json(500);
  }
});

module.exports = router;
