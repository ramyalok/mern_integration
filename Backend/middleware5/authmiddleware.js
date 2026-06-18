const jwt = require("jsonwebtoken");
const User = require("../model2/users");
// /AUTH MIDDLEWARE VERIFY TOKEN
module.exports = async (req, res, next) => {
  try {
    //const token = req.headers.authorization?.split(" ")[1];
    console.log("HEADERS:", req.headers);
    const token = req.headers.authorization?.split(" ")[1];
    console.log("TOKEN:", token);
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized", //login required to verify token no login so unauthorized
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("iam decoded id ", decoded);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found after login check",
      });
    }
    console.log(decoded); //iam decoded id  { id: '6a2c47cb2be72542423f4144', iat: 1781351678, exp: 1781956478 }
    req.user = user;
    
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};


// Step 1 → User Login

// User enters:

// {
//  "email":"ramya@gmail.com",
//  "password":"12345"
// }

// Login code:

// const registerduser =
// await User.findOne({ email });

// MongoDB returns:

// {
//  "_id":"u101",
//  "username":"Ramya",
//  "email":"ramya@gmail.com",
//  "role":"admin"
// }

// Now:

// registerduser._id

// equals:

// u101
// Step 2 → Token Generated Using That User ID

// Code:

// const token =
// generateToken(
// registerduser._id
// )

// Calls:

// jwt.sign(
// {
//  id:"u101"
// },
// process.env.JWT_SECRET
// )

// Token now secretly contains:

// {
// "id":"u101"
// }

// Returned:

// {
// "token":"eyJhbGci..."
// }

// Frontend stores it.

// Step 3 → User Calls Protected Route

// Example:

// GET /api/users/profile

// Header:

// Authorization:
// Bearer eyJhb...
// Step 4 → Middleware Reads Token

// Code:

// const decoded =
// jwt.verify(
// token,
// process.env.JWT_SECRET
// )

// Decoded result:

// decoded =
// {
//  id:"u101"
// }

// Now:

// decoded.id

// is:

// u101
// Step 5 → Find Particular User

// Code:

// const user =
// await User.findById(
// decoded.id
// )

// Becomes:

// await User.findById(
// "u101"
// )

// MongoDB searches:

// Find user with id u101

// Returns:

// {
//  "_id":"u101",
//  "username":"Ramya",
//  "email":"ramya@gmail.com",
//  "role":"admin"
// }
// Step 6 → Attach User To Request

// Code:

// req.user = user;

// Now request becomes:

// req={
//  headers:{},

//  user:{
//    _id:"u101",
//    username:"Ramya",
//    role:"admin"
//  }
// }

// Then controller can use:

// req.user._id
// req.user.role
// req.user.email

// Example:

// exports.getProfile =
// (req,res)=>{
//  res.json(req.user)
// }

// Response:

// {
//  "_id":"u101",
//  "username":"Ramya",
//  "role":"admin"
// }

// So yes:

// LOGIN
// ↓
// Take logged user's _id
// ↓
// Store inside JWT
// ↓
// Middleware extracts id
// ↓
// Find that particular user
// ↓
// Store in req.user
// ↓
// Controller uses req.user