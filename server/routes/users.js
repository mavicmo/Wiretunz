const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const auth = require("../middleware/auth");

const bcrypt = require("bcrypt");

//signup user route
router.post("/signup", async (req, res) => {
  console.log("hit");
  try {
    console.log("hit");
    // user input and convert to lowercase
    const { firstName, lastName, email, password } = req.body;

    // validate user has entered something
    if (!(firstName && lastName && email && password)) {
      res.status(400).send("Please enter all required fields");
    }

    //validate if existing user
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(400).send("User Already Exist. Try Logging In!");
    }

    //encrypt the input password
    const hashPassword = await bcrypt.hash(password, 10);

    //create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashPassword,
    });

    //send message user was created
    return res.status(201).json({
      newUser,
      status: 201,
      message: "User was created successfully",
      requestedAt: new Date().toLocaleString(),
    });
  } catch (error) {
    //error
    console.log(error);
  }
});

//login user
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    //get user input
    const { email, password } = req.body;

    //validate user input
    if (!(email && password)) {
      res.status(400).send("Please enter all required fields");
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { _id: this._id, email: this.email },
        process.env.JWTPRIVATEKEY,
        { expiresIn: "1d" }
      );

      // save user token
      user.token = token;

      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (error) {
    console.log(error);
  }
});

router.post("/homepage", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router;
