const Paper = require("../../model/Paper");
const User = require("../../model/User");

const handleSinglePaper = async (req, res) => {
  const { paper_id } = req.query;
  /**
   * 모두에게 공개되어도 됨.
   * 그냥 단일 페이퍼를 제공한다.
   */
  if (!paper_id) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "readSinglePaperController.js/handleSinglePaper",
      type: "Paper 읽기 실패",
      message: "body 내용 불충분",
    });
  }
  try {
    const foundPaper = await Paper.findOne(
      { _id: paper_id, visible: true, delete: false },
      { text: 1, comment: 1 }
    );
    if (!foundPaper) {
      return res.status(400).json({
        status: 400,
        success: false,
        source: "readSinglePaperController.js/handleSinglePaper",
        type: "Paper 읽기 실패",
        message: "해당하는 페이퍼 없음",
      });
    }

    return res.status(201).json({
      status: 200,
      success: true,
      message: "성공적인 조회",
      paperInfo: foundPaper,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      source: "readSinglePaperController.js/handleSinglePaper",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

module.exports = { handleSinglePaper };
