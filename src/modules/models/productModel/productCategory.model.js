// models/ProductCategory.js
const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema(
  {
    name: String,
    desc: String,
    deletedAt: {
      type: Date,
      default: null
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 🔗 Virtual Populate
productCategorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "categoryId",
  justOne: false,
});

module.exports = mongoose.model("ProductCategory", productCategorySchema);
