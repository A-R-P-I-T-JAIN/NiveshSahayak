const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: Number,
    required: [true, "Password is required"],
  },
  mobile_Number: {
    type: Number,
    required: [true, "Mobile Number is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: Number,
    default: undefined,
  },
  organisationName: {
    type: String,
    required: [true, "Name is required"],
  },
  businessId: {
    type: Number,
    default: undefined,
  },
  businessIdType: {
    type: Number,
    default: undefined,
  },
  businessCategory: {
    type: String,
    default: undefined,
  },
  ownershipType: {
    type: String,
    default: undefined,
  },
  post: [
    {
      type: String,
      default: undefined,
    },
  ],
  borrowersList: [
    {
      type: String,
      default: undefined,
    },
  ],
  investorsList: [
    {
      type: String,
      default: undefined,
    },
  ],
  bissiBanking: [
    {
      type: String,
      default: undefined,
    },
  ],
  b2bLoans: [
    {
      type: String,
      default: undefined,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
