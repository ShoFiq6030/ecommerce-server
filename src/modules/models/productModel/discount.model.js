// models/Discount.js
const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    name: String,
    desc: String,
    discountPercent: Number,
    active: {
      type: Boolean,
      default: true,
    },
 
    deletedAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 🔗 Virtual Populate
discountSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "discountId",
  justOne: false,
});

module.exports = mongoose.model("Discount", discountSchema);
