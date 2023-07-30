const Topic = require("../../model/Topic");
const handleUpdateTopic = async (req, res) => {
  const { _id } = req.userInfo;
  const { topic_id } = req.params;
  const { visible } = req.body;
  console.log(visible);
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
      // topicObject: {
      //   topic_id: foundTopic._id,
      //   title: foundTopic.title,
      //   author: "익명",
      //   paper: foundTopic.paper,
      // },
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
