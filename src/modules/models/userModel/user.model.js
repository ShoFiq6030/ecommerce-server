const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
    },

    password: {
      type: String,
      // required: true,
      select: false,
    },

    name: {
      type: String,
      required: true,
    },

    telephone: {
      type: String,
    },
    auth_provider: {
      type: String,
      default: "credential"
    },
    provider_id: String,
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("User", userSchema);
