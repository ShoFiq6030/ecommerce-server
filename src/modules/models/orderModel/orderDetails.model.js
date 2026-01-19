// models/OrderDetails.js
const mongoose = require("mongoose");

const orderDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },

    // If you want 1:1 relation like ERD, keep paymentId here.
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentDetails",
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
      index: true,
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

// Hide soft-deleted by default
orderDetailsSchema.pre(/^find/, function (next) {
  if (!this.getOptions().withDeleted) {
    this.where({ deletedAt: null });
  }
  next();
});

// Virtual populate: order -> items
orderDetailsSchema.virtual("items", {
  ref: "OrderItem",
  localField: "_id",
  foreignField: "orderId",
  justOne: false,
});

// Virtual populate: order -> payment (alternative to paymentId)
orderDetailsSchema.virtual("payment", {
  ref: "PaymentDetails",
  localField: "_id",
  foreignField: "orderId",
  justOne: true,
});

module.exports = mongoose.model("OrderDetails", orderDetailsSchema);
