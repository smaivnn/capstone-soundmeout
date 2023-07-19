const Notification = require("../../model/Notification");

// 페이지에 진입했을 때
// 경로를 확인해보고
// 경로가 동일하다면 read true로 바꾼다.

const handleReadStatus = async (req, res) => {
  const { notiId } = req.body;
  const referer = req.headers.referer;

  try {
    const foundNoti = await Notification.findOne({ _id: notiId });
    if (referer === foundNoti.redirectURL) {
      foundNoti.read = true;
      foundNoti.save();
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

module.exports = { handleReadStatus };
