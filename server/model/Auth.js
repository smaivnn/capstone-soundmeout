const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    usage: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;
