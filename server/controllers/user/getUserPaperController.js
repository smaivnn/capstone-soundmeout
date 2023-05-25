const Paper = require("../../model/Paper");

const handleUserPaper = async (req, res) => {
  const { loginId } = req.params;
  if (!loginId) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "getUserPaperController.js/handleUserPaper",
      type: " 조회 실패",
      message: "request body not enough.",
    });
  }

  // 유저 토픽 조회
  try {
    const foundPaper = await Paper.findOne({ "author.loginId": loginId })
      .populate("author")
      .exec();

    if (!foundPaper) {
      return res.status().json({});
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "성공적인 페이퍼 조회",
      paperArray: foundPaper,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      source: "getUserPaperController.js/handleUserPaper",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

module.exports = { handleUserPaper };
