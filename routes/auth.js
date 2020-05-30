const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidate, loginValidate } = require("../validate-config");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  //Validation
  const error = registerValidate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  else {
    //Check if email exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) res.status(400).send("Email already exist");

    //bcrypt
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    //Save to DB
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
    });
    try {
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.post("/login", async (req, res) => {
  //Validation
  const error = loginValidate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  else {
    console.log(`Email: ${req.body.email} Password: ${req.body.password}`);
    //Check if email exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email doesn't exist");

    //Password check
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid Password");

    //JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    try {
      res.header("auth-token", token);
      res.send("Logged in");
    } catch (e) {
      res.status(400);
    }
  }
});

module.exports = router;
