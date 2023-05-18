const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
    },
    type: {
      type: String,
    },
    redirectURL: {
      type: String,
    },
    read: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
