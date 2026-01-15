const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // do not return password
    },

    first_name: {
      type: String,
      required: true,
    },

    last_name: {
      type: String,
      required: true,
    },

    telephone: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey:false
  }
);

module.exports = mongoose.model("User", userSchema);
