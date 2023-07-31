const Notification = require("../../model/Notification");

// 페이지에 진입했을 때
// 경로를 확인해보고
// 경로가 동일하다면 read true로 바꾼다.

// 현재 주소를 그냥 보내면
// 그 유알엘의

const handleReadStatus = async (req, res) => {
  const { redirectURL } = req.body;
  const { loginId } = req.userInfo;

  try {
    const foundNoti = await Notification.find({
      redirectURL,
      read: false,
      receiverId: loginId,
    });

    if (foundNoti) {
      foundNoti.forEach((element) => {
        element.read = true;
      });
      foundNoti.save();
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

module.exports = { handleReadStatus };
