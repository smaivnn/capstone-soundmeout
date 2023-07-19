const Topic = require("../../model/Topic");

const handleUserTopic = async (req, res) => {
  const { loginId } = req.params;
  console.log(loginId);
  if (!loginId) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "getUserTopicController.js/handleUserTopic",
      type: " 조회 실패",
      message: "request body not enough.",
    });
  }

  // 유저 토픽 조회
  try {
    const foundTopic = await Topic.findOne({ "author.loginId": loginId })
      .populate("author")
      .exec();

    if (!foundTopic) {
      return res.status(222).json({});
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "성공적인 토픽 조회",
      topicArray: foundTopic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      source: "getUserTopicController.js/handleUserTopic",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

module.exports = { handleUserTopic };
