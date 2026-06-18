const validateCustomer = (req, res, next) => {
  const { customerName,email, phone, company,address,} = req.body;

  if (!customerName || !email || !phone || !company || !address) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  next();
};

module.exports = validateCustomer;
