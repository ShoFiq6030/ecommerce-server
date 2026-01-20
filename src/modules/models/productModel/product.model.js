// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    desc: String,
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    price: Number,
    images: {
      type: [String],
      default: [],
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
    inventoryCount: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      default: ""
    },
    color:
    {
      type: String,
      default: ""

    },
    weight: String,
    discountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
      default: null,
    },

    deletedAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre(/^find/, function (next) {
  if (!this.getOptions().withDeleted) {
    this.where({ deletedAt: null });
  }
  if (next) {
    next();
  }
});

module.exports = mongoose.model("Product", productSchema);
