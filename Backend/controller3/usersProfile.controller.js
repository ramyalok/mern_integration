// User profile operations
// exports.getProfile = async (req, res) => {
//   res.json(req.user);
// };

//litle deep
const User = require("../model2/users")
exports.getProfile = async (req, res) => {
  try {
    //
      const user = await User.findById(req.user.id) //Go to MongoDB and find the user using the logged-in user's ID.
        .select("-password");//This means:❌ Do NOT send password.
     res.status(200).json({
      success: true,
      user,
      // user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


//profile view as admin /smae as user //password is removed
// {
//  "success": true,
//  "user": {
//    "_id":"123",
//    "username":"ramya",
//    "email":"ram@gmail.com",
//    "role":"admin"
//  }
// }