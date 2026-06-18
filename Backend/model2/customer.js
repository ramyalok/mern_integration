// models/Customer.js

const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    company: {
      type: String,
    },

    address: {
      type: String,
    },

    status: {
      type: String,

      enum: ["active", "inactive"],

      default: "active",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Mern_users",
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Mern_Customer", CustomerSchema);
