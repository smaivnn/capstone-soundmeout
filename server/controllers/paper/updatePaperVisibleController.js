const Paper = require("../../model/Paper");
const User = require("../../model/User");

const { saveNotification } = require("../../utils/saveNotification");

const handlePaperVisible = async (req, res) => {
  const { _id } = req.userInfo;
  const { paper_id, redirectURL } = req.body;
  /**
   * 모두에게 공개되어도 됨.
   * 그냥 단일 페이퍼를 제공한다.
   */
  if (!_id || !paper_id) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "updatePaperVisibleController.js/handlePaperVisible",
      type: "Paper 생성 실패",
      message: "body 내용 불충분",
    });
  }
  try {
    const foundPaper = await Paper.findOne({ _id: paper_id });
    if (!foundPaper) {
      return res.status(400).json({
        status: 400,
        success: false,
        source: "updatePaperVisibleController.js/handlePaperVisible",
        type: "Paper 생성 실패",
        message: "body 내용 불충분",
      });
    }

    foundPaper.visible = foundPaper.visible === false ? true : false;
    foundPaper.save();

    const category = `paper visible`;
    const senderId = _id;
    const receiverId = foundPaper.author;
    const result = await saveNotification(
      redirectURL,
      category,
      senderId,
      receiverId
    );

    return res.status(200).json({
      status: 200,
      success: true,
      message: "성공적인 조회",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      source: "updatePaperVisibleController.js/handlePaperVisible",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

module.exports = { handlePaperVisible };
