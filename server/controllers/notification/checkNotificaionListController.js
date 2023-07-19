const Notification = require("../../model/Notification");
const User = require("../../model/User");

const handleNotificationRead = async (req, res) => {
  // 유저 정보를 확인한다.]

  const userInfo = req.userInfo;

  try {
    // 내 알림 중에서 read가 false인것이 1개 이상인지 확인한다.
    const count = await Notification.countDocuments({
      receiverId: userInfo._id,
      read: false,
    });

    // 0이 아닐경우
    if (count > 0) {
      const foundNoti = await Notification.find({
        receiverId: userInfo._id,
        read: false,
      });

      return res.status(201).json({
        success: true,
        notiArray: foundNoti,
      });
    } else {
      return res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      status: 500,
      source: "checkNotificationListController.js/handleNotificationRead",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

module.exports = { handleNotificationRead };
