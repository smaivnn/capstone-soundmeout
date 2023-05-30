const Paper = require("../../model/Paper");
const User = require("../../model/User");

const handlePaperList = async (req, res) => {
  const { topic_id } = req.query;

  if (!topic_id) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "readPaperListController.js/handlePaperList",
      type: "Paper 읽기 실패",
      message: "body 내용 불충분",
    });
  }

  try {
    const foundPaperList = await Paper.find(
      { topic: topic_id, visible: true, delete: false },
      { text: 1, comment: 1 }
    );
    if (!foundPaper) {
      return res.status(400).json({
        status: 400,
        success: false,
        source: "readPaperListController.js/handlePaperList",
        type: "Paper 읽기 실패",
        message: "해당하는 페이퍼 없음",
      });
    }

    return res.status(201).json({
      status: 200,
      success: true,
      message: "성공적인 조회",
      paperArray: foundPaperList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      source: "readPaperListController.js/handlePaperList",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

module.exports = { handlePaperList };
