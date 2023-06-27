const Paper = require("../../model/Paper");
const User = require("../../model/User");

const handleDeletePaper = async (req, res) => {
  const { _id, loginId, email, name, roles } = req.userInfo;
  const { paper_id, redirectPath } = req.body;
  /**
   * 지우는 과정은 함부로 하면 안됨.
   * 로그인 된 유저 정보와, 본인의 토픽이 맞는지 검증한다.
   */
  if (!_id || !paper_id) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "deletePaperController.js/handleDeletePaper",
      type: "Paper 생성 실패",
      message: "body 내용 불충분",
    });
  }
  try {
    const foundUser = await User.findOne({ _id }); // 로그인 유저 정보
    const logedInUserRefreshToken = req.cookies.refreshToken; // cookie의 리프래시토큰

    if (foundUser.refreshToken === logedInUserRefreshToken) {
      //둘이 같은지 확인한다.
      const foundPaper = await Paper.findOne({ _id: paper_id });
      foundPaper.visible = false;
      foundPaper.delete = true;

      foundPaper.save();
    }

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
      source: "deletePaperController.js/handleDeletePaper",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

module.exports = { handleDeletePaper };
