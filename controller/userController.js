const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY || "secret123";
  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(name, email, password ,"registerdata")
    if (!name || !email || !password)
      return res.status(400).json("All fields are required");

    let user = await userModel.findOne({ email });

    if (user) return res.status(400).json("User already exists....");

    if (!validator.isEmail(email))
      return res.status(400).json("Email must be valid");

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    console.log(user);
    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      name,
      email,
      success: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password)
      return res.status(400).json("All fields are required");

    let user = await userModel.findOne({ email });

    if (!user) return res.status(400).json("User not found");

    const isValiPassword = await bcrypt.compare(password, user.password);

    if (!isValiPassword) return res.status(400).json("Invalid Password");

    const token = createToken(user._id);

    res.status(200).json({
      token,
      success: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  userRegister,
  userLogin
};
