import React, { useState } from "react";
import { registerUser, loginUser, forgotPassword } from "../utils/ApiAuth";

function AuthRegLog() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    remember: false,
  });

  const [message, setMessage] = useState("");

  const change = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // REGISTER
  const register = async () => {
    try {
      const res = await registerUser({
        username: form.username,

        email: form.email,

        password: form.password,

        role: form.role,
      });

      setMessage(res.data.message);

      setIsLogin(true);
    } catch (err) {
      setMessage(err.response?.data?.message);
    }
  };
  // LOGIN
  const login = async () => {
    try {
      const res = await loginUser({
        email: form.email,

        password: form.password,
      });

      if (form.remember) {
        localStorage.setItem("token", res.data.token);
      } else {
        sessionStorage.setItem("token", res.data.token);
      }

      // IMPORTANT
      localStorage.setItem("role", res.data.data.role);

      setMessage("Login Success");

      window.location = "/";
    } catch (err) {
      setMessage(err.response?.data?.message);
    }
  };
  // FORGOT PASSWORD
  const forgot = async () => {
    try {
      const res = await forgotPassword({
        email: form.email,

        password: form.password,
      });

      setMessage(res.data.message);
    } catch {
      setMessage("Forgot Password Failed");
    }
  };

  const submit = (e) => {
    e.preventDefault();

    isLogin ? login() : register();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 ">
      <div className=" bg-white p-8 rounded shadow w-[400px] ">
        <h1 className="text-3xl text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h1>

        <form onSubmit={submit}>
          {!isLogin && (
            <input type="text"
             name="username"
              placeholder="Username"
              className="border p-2 w-full mb-3"
              onChange={change}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 w-full mb-3"
            onChange={change}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2 w-full mb-3"
            onChange={change}
          />

          {!isLogin && (
            <select
              name="role"
              className="border p-2 w-full mb-3"
              onChange={change}
            >
              <option value="user">user</option>

              <option value="admin">admin</option>
            </select>
          )}

          {isLogin && (
            <div
              className="flex justify-between mb-3 "
            >
              <label>
                <input type="checkbox" name="remember" onChange={change} />
                Remember Me
              </label>

              <button type="button" onClick={forgot} className="underline-blue-200">
                Forgot?
              </button>
            </div>
          )}

          <button
            className="
            bg-blue-600
            text-white
            w-full
            p-2
            "
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p
          className="
          text-center
          mt-4
          "
        >
          {isLogin ? "No account?" : "Already have account?"}

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="
            text-blue-600
            ml-2
            "
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

        <p
          className="
          text-center
          mt-4
          text-green-600
          "
        >
          {message}
        </p>
      </div>
    </div>
  );
}

export default AuthRegLog;


// This AuthRegLog.jsx component is a complete Register + Login + Forgot Password frontend authentication page in React.

// I’ll explain the flow from top to bottom.

// 1. Import Section
// import React, { useState } from "react";
// import { registerUser, loginUser, forgotPassword } from "../utils/ApiAuth";
// What happens?
// useState → React Hook used to store data.
// registerUser() → Calls Register API.
// loginUser() → Calls Login API.
// forgotPassword() → Calls Forgot Password API.

// These functions usually come from:

// utils/ApiAuth.js

// Example:

// export const registerUser=(data)=>
// API.post("/users/register",data)

// export const loginUser=(data)=>
// API.post("/users/login",data)

// export const forgotPassword=(data)=>
// API.put("/users/forgot",data)
// 2. Component Starts
// function AuthRegLog() {

// Creates a React component.

// 3. State Variables
// Login/Register Toggle
// const [isLogin, setIsLogin] = useState(true);

// Controls screen mode.

// Initially:

// true → Login Screen
// false → Register Screen

// Example:

// If:

// isLogin=true

// Show:

// Email
// Password
// Remember Me
// Forgot
// Login Button

// If:

// isLogin=false

// Show:

// Username
// Email
// Password
// Role
// Register Button
// Form Data State
// const [form, setForm] = useState({
//  username:"",
//  email:"",
//  password:"",
//  role:"user",
//  remember:false
// });

// Stores user input.

// Example:

// Before typing:

// {
//  username:"",
//  email:"",
//  password:"",
//  role:"user",
//  remember:false
// }

// After entering:

// {
//  username:"ramya",
//  email:"ram@gmail.com",
//  password:"123",
//  role:"admin",
//  remember:true
// }
// Message State
// const [message,setMessage]=useState("")

// Used to show:

// Login Success
// Register Success
// Wrong Password
// 4. Input Change Function
// const change=(e)=>{
//  const {name,value,checked,type}=e.target;

//  setForm({
//    ...form,
//    [name]:type==="checkbox"
//       ? checked
//       : value
//  });
// }
// Purpose

// Updates form automatically.

// Example:

// User types:

// <input name="email"/>

// Input:

// ram@gmail.com

// State becomes:

// form.email="ram@gmail.com"

// Checkbox:

// <input type="checkbox"/>

// Stores:

// remember:true
// 5. REGISTER FUNCTION
// const register=async()=>{

// Called when user clicks Register.

// Step 1

// Send data:

// registerUser({
//  username,
//  email,
//  password,
//  role
// })

// Request:

// POST /users/register

// Body:

// {
//  "username":"ramya",
//  "email":"ram@gmail.com",
//  "password":"123",
//  "role":"admin"
// }

// ↓

// Backend receives.

// Backend Flow

// Controller:

// registerUser(req,res)

// ↓

// Validate fields

// ↓

// Hash password

// bcrypt.hash()

// ↓

// Save to MongoDB

// User.create()

// ↓

// Return:

// {
//  "message":"Registered Successfully"
// }

// Frontend:

// setMessage(res.data.message)

// Shows:

// Registered Successfully

// Then:

// setIsLogin(true)

// Switches to Login page.

// Architecture:

// React
//  ↓
// register()
//  ↓
// ApiAuth.js
//  ↓
// POST /users/register
//  ↓
// Express
//  ↓
// Controller
//  ↓
// bcrypt
//  ↓
// MongoDB
//  ↓
// Response
//  ↓
// React UI
// 6. LOGIN FUNCTION
// const login=async()=>{

// Called when Login button clicked.

// Step 1

// Send:

// loginUser({
//  email,
//  password
// })

// Request:

// POST /users/login

// Body:

// {
//  "email":"ram@gmail.com",
//  "password":"123"
// }

// Backend:

// Find user:

// User.findOne()

// ↓

// Compare password:

// bcrypt.compare()

// ↓

// Generate JWT:

// jwt.sign()

// ↓

// Return:

// {
//  "token":"abc123",
//  "data":{
//    "role":"admin"
//  }
// }

// Frontend receives:

// res.data.token
// 7. Remember Me Logic
// if(form.remember)

// TRUE:

// localStorage.setItem()

// Stored permanently.

// Example:

// localStorage:
// token=abc123

// Browser closed → still exists.

// FALSE:

// sessionStorage.setItem()

// Temporary.

// Browser closed → removed.

// 8. Store Role
// localStorage.setItem(
//  "role",
//  res.data.data.role
// )

// Example:

// role="admin"

// Used for route protection.

// Example:

// if(role==="admin")

// Allow admin page.

// 9. Redirect
// window.location="/"

// Move user to:

// Homepage

// Architecture:

// Login Page
//  ↓
// POST /login
//  ↓
// Backend Validate
//  ↓
// Generate JWT
//  ↓
// Send Token
//  ↓
// Store Token
//  ↓
// Store Role
//  ↓
// Redirect Home
// 10. FORGOT PASSWORD
// const forgot=async()=>{

// Sends:

// forgotPassword({
//  email,
//  password
// })

// Example:

// PUT /users/forgot

// Body:

// {
//  "email":"ram@gmail.com",
//  "password":"new123"
// }

// Backend:

// Find User
//  ↓
// Hash New Password
//  ↓
// Update DB
//  ↓
// Return Success

// Frontend:

// setMessage()

// Shows result.

// 11. Submit Function
// const submit=(e)=>{
//  e.preventDefault();

//  isLogin
//    ? login()
//    : register();
// }

// Prevents refresh.

// If:

// true

// Run:

// login()

// Else:

// register()
// 12. JSX UI Rendering
// <form onSubmit={submit}>

// Form submits.

// Register Only:

// !isLogin

// Shows:

// Username
// Role

// Always:

// Email
// Password

// Login Only:

// Remember
// Forgot

// Button:

// Login/Register
// Full Authentication Flow
// USER
//  ↓
// AuthRegLog.jsx
//  ↓
// ApiAuth.js
//  ↓
// Axios Request
//  ↓
// Express Route
//  ↓
// Controller
//  ↓
// bcrypt
//  ↓
// MongoDB
//  ↓
// JWT Token
//  ↓
// Frontend Storage
//  ↓
// Protected Routes
//  ↓
// Dashboard

// This component is acting as Authentication UI → API Communication → Token Storage → Navigation in your MERN architecture.