const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    name: {
      type: String,
      required: true,
    },

    type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminType",
      required: true,
    },

    last_login: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },   
    toObject: { virtuals: true }, 
  }
);


  //  Virtual for renamed populate

adminUserSchema.virtual("type", {
  ref: "AdminType",
  localField: "type_id",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("AdminUser", adminUserSchema);
