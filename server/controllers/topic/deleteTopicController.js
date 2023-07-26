const Topic = require("../../model/Topic");
const User = require("../../model/User");

const handleDeleteTopic = async (req, res) => {
  const { _id } = req.userInfo;
  const { topic_id } = req.params;
  if (!topic_id || !_id) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "deleteTopicController.js/handleDeleteTopic",
      type: "삭제 실패",
      message: "request body not enough.",
    });
  }
  try {
    const foundUser = await User.findOne({ _id });
    const logedInUserRefreshToken = req.cookies.refreshToken;
    console.log(logedInUserRefreshToken);
    if (foundUser.refreshToken.toString() !== logedInUserRefreshToken) {
      return res.status(400).json({
        status: 400,
        success: false,
        source: "deleteTopicController.js/handleDeleteTopic",
        type: "삭제 실패",
        message: "인증권한이 없습니다.",
      });
    }
    const foundTopic = await Topic.findOne({ _id: topic_id, delete: false });
    foundTopic.visible = false;
    foundTopic.delete = true;
    await foundTopic.save();
    res.status(200).json({
      status: 200,
      success: true,
      message: "성공적인 토픽 삭제",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      success: false,
      source: "deleteTopicController.js/handleDeleteTopic",
      type: "server error",
    });
  }
};
module.exports = { handleDeleteTopic };
