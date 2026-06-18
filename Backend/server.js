const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors());

const connectDB = require("./config1/db.config");
connectDB();

app.use(express.json());


//routes connection 1.login/register
const authuserroutes = require("./routes4/authuser.route");
app.use("/users", authuserroutes);
 
//2.customers crud
const customerroutes = require("./routes4/customer.route");
app.use("/customer", customerroutes);

//3. profile view// get = http://localhost:5000/userProfile/getprofile 
const userProfileroutes = require ("./routes4/userProfile.route");
app.use("/userProfile",userProfileroutes);

//basic handler for server 500code
const errorHandler = require("./middleware5/global_err_handler");
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});


// {
// "customerName":"Kamal",

// "email":"kamal@gmail.com",

// "phone":"999999999",

// "company":"ABC",

// "address":"Chennai"
// }
// GET /customers/search?company=tcs

// Examples:
//localhost:4000/customer/search?company=tcs
//localhost:4000/customer/search
// /customers/search?search=kamal

// /customers/search?company=abc

// /customers/search?address=chennai

// /customers/search?sort=customerName