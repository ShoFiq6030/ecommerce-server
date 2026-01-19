// models/CartItem.js
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShoppingSession",
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
      default: 1,
    },

    // Optional snapshot (recommended): keep price at the time it was added
    unitPrice: {
      type: Number,
      min: 0,
      default: 0,
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

// Prevent duplicate same product in the same session (one row per product)
cartItemSchema.index({ sessionId: 1, productId: 1 }, { unique: true });

// Hide soft-deleted by default
cartItemSchema.pre(/^find/, function (next) {
  if (!this.getOptions().withDeleted) {
    this.where({ deletedAt: null });
  }
  next();
});

module.exports = mongoose.model("CartItem", cartItemSchema);
