const Topic = require("../../model/Topic");

const handleGetTopic = async (req, res) => {
  const { topic_id } = req.params;
  const { _id } = req.userInfo;

  if (!topic_id) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "getTopicController.js/handleGetTopic",
      type: " 조회 실패",
      message: "request body not enough.",
    });
  }
  try {
    const result = await Topic.findOne({ _id: topic_id, delete: false });
    if (!result) {
      return res.status(400).json({
        status: 400,
        success: false,
        source: "getTopicController.js/handleGetTopic",
        type: " 조회 실패",
        message: "topic not found.",
      });
    }

    // visible이 false이면, author가 나인지 확인 후, 아니면 400에러
    if (!result.visible) {
      if (result.author.toString() !== _id) {
        return res.status(400).json({
          status: 400,
          success: false,
          source: "getTopicController.js/handleGetTopic",
          type: " 조회 실패",
          message: "topic not found.",
        });
      }
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "성공적인 토픽 조회",
      result: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      source: "getTopicController.js/handleGetTopic",
      type: " 조회 실패",
      message: "server error.",
    });
  }
};

module.exports = { handleGetTopic };
