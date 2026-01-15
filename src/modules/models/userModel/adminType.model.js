const mongoose = require("mongoose");

const adminTypeSchema = new mongoose.Schema(
  {
    admin_type: {
      type: String,
      required: true,
      unique: true,
    },

    permissions: {
      type: [String], // e.g. ["CREATE_USER", "DELETE_USER"]
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("AdminType", adminTypeSchema);
