const Follow = require("../../model/Follow");
const User = require("../../model/User");
const handleDeleteFollow = async (req, res) => {
  const { _id } = req.userInfo;
  const { user_id } = req.params;
  if (!_id || !user_id) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "createFollowController.js/handleDeleteFollow",
      type: "Follow 생성 실패",
      message: "body 내용 불충분",
    });
  }
  try {
    // following중인지 확인
    const foundFollowing = await Follow.findOne({
      followerId: _id,
      followingId: user_id,
    });
    if (!foundFollowing) {
      return res.status(400).json({
        status: 400,
        success: false,
        source: "createFollowController.js/handleDeleteFollow",
        type: "Follow 생성 실패",
        message: "following중이 아님",
      });
    }
    const result = await Follow.deleteOne({
      followerId: _id,
      followingId: user_id,
    });
    return res.status(200).json({
      status: 200,
      success: true,
      source: "createFollowController.js/handleDeleteFollow",
      type: "Follow 삭제 성공",
      message: "Follow 삭제 성공",
      //result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      source: "createFollowController.js/handleDeleteFollow",
      type: "Follow 삭제 실패",
      message: "Follow 삭제 실패",
      error,
    });
  }
};
module.exports = { handleDeleteFollow };
