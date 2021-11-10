const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");

router.post("/signup", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    user = new User({
      username: req.body.username,
    });
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(_.pick(user, ["_id", "username"]));
  } catch (error) {
    console.log(error.code);
    if(error.code === 11000) return res.status(400).send('User already exitst!');
    res.status(500).send("Something went wrong! Contact admin!");
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Invalid credentials!");

    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid credentials!");

    const token = user.generateAuthToken();
    res.send(token);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong! Contact admin!");
  }
});

module.exports = router;
