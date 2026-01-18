// models/ProductInventory.js
const mongoose = require("mongoose");

const productInventorySchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
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
productInventorySchema.virtual("product", {
  ref: "Product",
  localField: "_id",
  foreignField: "inventoryId",
  justOne: true,
});

module.exports = mongoose.model("ProductInventory", productInventorySchema);
