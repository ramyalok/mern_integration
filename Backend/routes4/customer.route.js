const express = require("express");

const router = express.Router();

// middleware
const auth = require("../middleware5/authmiddleware");
const role = require("../middleware5/rolemiddleware");
//mw
const ValidateCustomer = require("../middleware5/validateCusmiddleware")
// controller
const customerController = require("../controller3/customer.controller");

//// GET ALL CUSTOMERS
// admin + user
router.get("/",auth,customerController.getcustomers);
// SEARCH CUSTOMER
router.get("/search",auth,customerController.searchcustomers);
// GET CUSTOMER BY ID
router.get("/:id",auth,customerController.GetcustomerById);

 
// CREATE CUSTOMER// UPDATE CUSTOMER
// admin only
router.post(
  "/create",
  auth,
  role("admin"),
  ValidateCustomer,
  customerController.createcustomer,
);
router.put("/:id",auth,role("admin"),customerController.updatecustomer);
router.delete("/:id", auth, role("admin"), customerController.deletecustomer);



module.exports =router;
