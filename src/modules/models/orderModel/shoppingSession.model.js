
const mongoose = require("mongoose");

const shoppingSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["active", "converted", "abandoned"],
      default: "active",
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hide soft-deleted by default (with escape hatch)
shoppingSessionSchema.pre(/^find/, function () {
  if (!this.getOptions().withDeleted) {
    this.where({ deletedAt: null });
  }
});

// Virtual populate: session -> cartItems
shoppingSessionSchema.virtual("items", {
  ref: "CartItem",
  localField: "_id",
  foreignField: "sessionId",
  justOne: false,
});

module.exports = mongoose.model("ShoppingSession", shoppingSessionSchema);
