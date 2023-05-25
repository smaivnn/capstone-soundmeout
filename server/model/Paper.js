const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./Comment");

const paperSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: [Comment.schema],
    },
    visible: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Paper = mongoose.model("Paper", paperSchema);
module.exports = Paper;
