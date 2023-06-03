const Topic = require("../../model/Topic");

const handleCreateTopic = async (req, res) => {
  const { title } = req.body;
  const { _id } = req.userInfo;
  if (!title || !_id) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "createTopicController.js/handleCreateTopic",
      type: "생성 실패",
      message: "request body not enough.",
    });
  }
  try {
    const newTopic = new Topic({
      title: title,
      author: _id,
    });
    const result = await newTopic.save();
    res.status(201).json({
      status: 201,
      success: true,
      message: "성공적인 토픽 생성",
      result: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      source: "createTopicController.js/handleCreateTopic",
      type: "생성 실패",
      message: "server error.",
    });
  }
};

module.exports = { handleCreateTopic };
