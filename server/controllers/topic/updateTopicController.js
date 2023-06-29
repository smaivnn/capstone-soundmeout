const Topic = require("../../model/Topic");
const handleUpdateTopic = async (req, res) => {
  req.userInfo = { _id: "64732750f627afffdbce28f8" }; //test
  const { _id } = req.userInfo;
  const { topic_id } = req.params;
  const { visible } = req.body;
  if (!topic_id || !_id || visible === undefined) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "updateTopicController.js/handleUpdateTopic",
      type: "수정 실패",
      message: "request body not enough.",
    });
  }
  try {
    const foundTopic = await Topic.findOne({ _id: topic_id, delete: false });
    foundTopic.visible = visible;
    const result = await foundTopic.save();
    res.status(200).json({
      status: 200,
      success: true,
      message: "성공적인 토픽 수정",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      source: "updateTopicController.js/handleUpdateTopic",
      type: "server error",
      message: "server error.",
    });
  }
};

module.exports = { handleUpdateTopic };
