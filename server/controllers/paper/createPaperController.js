const Paper = require("../../model/Paper");

const handleCreatePaper = async (req, res) => {
  const { _id } = req.userInfo;
  const { topic_id, text, redirectPath } = req.body;

  if (!_id || !topic_id || !text) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "createPaperController.js/handleCreatePaper",
      type: "Paper 생성 실패",
      message: "body 내용 불충분",
    });
  }
  try {
    const newPaper = await Paper.create({
      text,
      author: _id,
      topic: topic_id,
      visible: false,
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "성공적인 조회",
      redirectPath: redirectPath,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      source: "createPaperController.js/handleCreatePaper",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

module.exports = { handleCreatePaper };
