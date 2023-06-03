const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Paper = require("./Paper");

const topicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paper: {
      type: [Paper.schema],
    },
    visible: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;
