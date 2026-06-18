const router = require("express").Router();

const auth = require("../middleware5/authmiddleware");
// const role = require("../middlewares5/role.middleware");
const { getProfile } = require("../controller3/usersProfile.controller");

router.get("/getprofile", auth, getProfile);//because auth only checks login.//not role
// router.get("/profile", auth, role("admin"), getProfile);
module.exports = router;


// GET /api/users/profile
//         ↓
// auth middleware
// (check token)
//         ↓
// role("admin")
// (check role)
//         ↓
// getProfile()
// Admin Login

// DB:

// {
// "username":"Ramya",
// "role":"admin"
// }

// Request:

// GET /api/users/profile
// Authorization:
// Bearer TOKEN

// Result:

// {
// "_id":"123",
// "username":"Ramya",
// "role":"admin"
// }

// Allowed ✅

// User Login

// DB:

// {
// "username":"John",
// "role":"user"
// }

// Request:

// GET /api/users/profile

// Middleware:

// if(!roles.includes(
// req.user.role
// ))

// Result:

// {
// "message":
// "Access denied"
// }

// Blocked ❌

// Your middleware execution order becomes:

// Request
// ↓
// Token verify
// ↓
// Find logged user
// ↓
// req.user
// ↓
// Check role === admin //if needede we check role here both admin / user can view the profile
// ↓
// Controller

// So:

// admin → can view profile
// user → denied
// guest → denied