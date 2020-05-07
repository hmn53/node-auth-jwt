const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { registerValidate, loginValidate } = require("./validate-config");

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
module.exports = router;
