// models/OrderItem.js
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderDetails",
      required: true,
      index: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    // Snapshot fields (recommended): protect order integrity even if product changes later
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    productName: {
      type: String,
      default: "",
      trim: true,
    },
    productSku: {
      type: String,
      default: "",
      trim: true,
    },

    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Avoid same product duplicated in same order (optional)
orderItemSchema.index({ orderId: 1, productId: 1 }, { unique: true });

// Hide soft-deleted by default
orderItemSchema.pre(/^find/, function (next) {
  if (!this.getOptions().withDeleted) {
    this.where({ deletedAt: null });
  }
  next();
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
