// models/PaymentDetails.js
const mongoose = require("mongoose");

const paymentDetailsSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderDetails",
      required: true,
      unique: true, // 1 payment per order (matches ERD)
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    provider: {
      type: String, // e.g. "stripe", "sslcommerz", "paypal", "cash"
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      index: true,
    },

    // Optional: provider transaction id
    transactionId: {
      type: String,
      default: null,
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

// Hide soft-deleted by default
paymentDetailsSchema.pre(/^find/, function (next) {
  if (!this.getOptions().withDeleted) {
    this.where({ deletedAt: null });
  }
  next();
});

module.exports = mongoose.model("PaymentDetails", paymentDetailsSchema);
