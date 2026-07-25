
// # customer CRUD & search
const customerModel = require("../model2/customer");

exports.createcustomer = async (req, res) => {
  try {
// customer details entered from frontend
const { email, phone } = req.body;
// check existing customer
const existingCustomer =
  await customerModel.findOne({
    $or: [
      { email },
      { phone }
    ]
  });
if (existingCustomer) {
  return res.status(400).json({
    success: false,
    message: "Customer already exists"
  });
}
// create only if not exists
    const newcustomer = await customerModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "customer created successfully",
      data: newcustomer,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Only admin can create customer.Users can view.That means access control is handled by auth middleware + role check, not by createdBy.So this is enough:
// await customerModel.create(req.body);because customer is a shared resource.Example:
// Admin A creates customer
// ↓
// Customer stored
// ↓
// All users can view //You don't need:createdBy  //because ownership is not important.

exports.getcustomers = async (req, res) => {
  try {
    const customers = await customerModel.find();
    res
      .status(200)
      .json({ message: "Getting  the customers successfully", customers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.GetcustomerById = async (req, res) => {
  try {
    const customer = await customerModel.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "customer not found" });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updatecustomer = async (req, res) => {
  try {
    const updatecustomer = await customerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    ); //new-true will return updated existing one or return same original one
    if (!updatecustomer) {
      return res
        .status(404)
        .json({ success: false, message: "customer not found" });
    }
    res.status(200).json({
      success: true,
      message: "customer updated successfully",
      data: updatecustomer,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletecustomer = async (req, res) => {
  try {
    const deletedcustomer = await customerModel.findByIdAndDelete(
      req.params.id,
    );
    if (!deletedcustomer) {
      return res
        .status(404)
        .json({ success: false, message: "customer not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Search customers
exports.searchcustomers = async (req, res) => {
  let result = await customerModel.find();

  // Filter by company
  if (req.query.company) {
    result = result.filter(
      (item) =>
        item.company.toLowerCase() === req.query.company.toLowerCase(),
    );
  }

  // Filter by address
  if (req.query.address) {
    result = result.filter(
      (item) => item.address.toLowerCase() === req.query.address.toLowerCase(),
    );
  }

  // Search by item name
  if (req.query.search) {
    result = result.filter((item) =>
      item.customerName.toLowerCase().includes(req.query.search.toLowerCase()),
    );
  }

  // Sort
  if (req.query.sort) {
    switch (req.query.sort) {
      case "customerName":
        result.sort((a, b) => a.customerName.localeCompare(b.customerName));
        break;
    }
  }

  res.status(200).json({
    message: "customers fetched successfully",
    data: result,
  });
};
