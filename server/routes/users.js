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
    // user input for user fields
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
  console.log("hit");
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
        { _id: user._id, email: user.email },
        process.env.JWTPRIVATEKEY,
        { expiresIn: "1d" }
      );

      // save user token
      user.token = token;

      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/homepage", auth, (req, res) => {
  res.status(200).send(`Welcome`);
});

// get user data
router.get("/:id", auth, async (req, res) => {
  console.log("hit get by id");
  try {
    const user = await User.findById(req.params.id).select("-password -__v");
    res.status(200).send({ data: user });
  } catch (error) {
    console.log(error);
  }
});

//update user data
router.put("/:id", auth, async (req, res) => {
  console.log("hit update");
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  ).select("-password -__v");
  res.status(200).send({ data: user, message: "User has been updated" });
});

// delete user by id
router.delete("/:id", [auth], async (req, res) => {
  console.log("hit delete");
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "User has been Deleted" });
});

module.exports = router;
