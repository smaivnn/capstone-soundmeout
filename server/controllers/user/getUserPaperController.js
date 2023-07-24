const Paper = require("../../model/Paper");

/**
 * 이걸 언제 쓰나 생각해봤는데 user항목에 있는 만큼 내가 쓴 페이퍼를 보는데 사용된다고 판단.
 * 따라서 내가 쓴 페이퍼를 불러오는데 사용할 것이라면 보안이 필요함 why? 남의 것도 가져올 수 있으니까.
 * 따라서 중간에 verify과정을 넣고 같으면 불러오는 방식으로 변경 -> accessToken 활용.
 *
 * 기능 : 내가 쓴 모든 페이퍼 조회
 *
 */
const handleUserPaper = async (req, res) => {
  const { userId } = req.params;
  const { _id, loginId } = req.userInfo;

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
    let foundPaperList;
    if (userId === loginId) {
      foundPaperList = await Paper.find({
        author: _id,
        delete: false,
      }).exec();
    }

    if (!foundPaperList) {
      return res.status(400).json({
        loginSuccess: false,
        source: "getUserPaperController/handleUserPaper",
        type: "페이퍼 검색 실패",
        message: "no paper",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "성공적인 페이퍼 조회",
      paperArray: foundPaperList,
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
