 import axios from "axios";//used to call backend APIs

 const API = axios.create({
   baseURL: "http://localhost:4000",
 });

 // AUTO ADD TOKEN //before GET /customer //after  GET /customer Authorization: Bearer abc123
 API.interceptors.request.use((config) => {
   const token =
     localStorage.getItem("token") || sessionStorage.getItem("token");

   if (token) {
     config.headers.Authorization = `Bearer ${token}`;
   }
   //request becomes Authorization: Bearer eyJhbGc...//attch token
   //after backen auth middleware read this token if match
   return config;
 });

 export const registerUser = (data) => API.post("/users/register", data);//calls POST /users/register

 export const loginUser = (data) => API.post("/users/login", data);//POST /users/login

 export const forgotPassword = (data) =>API.post("/users/forgotpassword", data);//POST /users/forgotpassword



 export default API;

 //
