const User = require("../model2/users"); //model connection
const bcrypt = require("bcryptjs");
const generateToken = require("../utils3/generatetoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({
        message: "User already exists",
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({
      message: "User registered successfully",
      success: true,
      //register person and hide password from api response not from database(internally check hashed password)
      data: {
        id: newuser._id,
        username: newuser.username,
        email: newuser.email,
        role: newuser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const registerduser = await User.findOne({ email });
    if (!registerduser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, registerduser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(registerduser._id);
    res.status(201).json({
      message: "login successfully",
      success: true,
      token,
      data: {
        id: registerduser._id,
        username: registerduser.username,
        email: registerduser.email,
        role: registerduser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 

// FORGOT PASSWORD

exports.forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check email
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    // update
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};