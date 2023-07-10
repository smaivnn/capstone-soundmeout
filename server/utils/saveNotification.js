const user = require("../model/User");
const Notification = require(`../model/Notification`);

const saveNotification = async (
  redirectPath,
  category,
  senderId,
  receiverId
) => {
  try {
    const newNoti = new Notification({
      senderId,
      receiverId,
      category,
      redirectPath,
      read: false,
    });

    await newNoti.save();
    console.log("run");
    return (success = true);
  } catch (error) {
    console.error(error);
    return (success = false);
  }
};

module.exports = { saveNotification };
