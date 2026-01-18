const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    address_line1: {
      type: String,
      required: true,
    },

    address_line2: {
      type: String,
    },

    city: {
      type: String,
      required: true,
    },

    postal_code: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    telephone: {
      type: String,
    },

    mobile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserAddress", userAddressSchema);
