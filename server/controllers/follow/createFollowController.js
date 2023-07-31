const Follow = require("../../model/Follow");
const User = require("../../model/User");

const handleCreateFollow = async (req, res) => {
  const { _id } = req.userInfo;
  const followingId = req.params.user_id;
  if (!_id || !followingId) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "createFollowController.js/handleCreateFollow",
      type: "Follow 생성 실패",
      message: "body 내용 불충분",
    });
  }

  try {
    // user_id가 존재하는지 확인
    const foundUser = User.findOne({ _id: followingId });
    if (!foundUser) {
      return res.status(404).json({
        status: 404,
        success: false,
        source: "createFollowController.js/handleCreateFollow",
        type: "Follow 생성 실패",
        message: "존재하지 않는 user_id",
      });
    }
    // 이미 팔로우한 사람인지 확인
    const done = await Follow.findOne({
      followerId: _id,
      followingId: followingId,
    });
    if (done) {
      return res.status(400).json({
        status: 400,
        success: false,
        source: "createFollowController.js/handleCreateFollow",
        type: "Follow 생성 실패",
        message: "이미 팔로우한 사람",
      });
    }
    const result = await Follow.create({
      followerId: _id,
      followingId: followingId,
    });
    return res.status(200).json({
      status: 200,
      success: true,
      source: "createFollowController.js/handleCreateFollow",
      type: "Follow 생성 성공",
      message: "Follow 생성 성공",
      //result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      source: "createFollowController.js/handleCreateFollow",
      type: "서버 에러",
      message: "Follow 생성 실패",
      error,
    });
  }
};
module.exports = { handleCreateFollow };
