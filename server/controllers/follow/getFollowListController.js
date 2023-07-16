const Follow = require("../../model/Follow");
const User = require("../../model/User");
const handleFollowingList = async (req, res) => {
  //const { _id } = req.userInfo;
  const _id = req.params.user_id;
  if (!_id) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "getFollowListController.js/handleFollowingList",
      type: "Following List 조회 실패",
      message: "body 내용 불충분",
    });
  }
  try {
    //following 중인 사람들 검색
    const result = await Follow.find({
      followerId: _id,
    }).populate("followingId", "name");
    // [{_id,name},...} 형식으로 변경
    const transformedResult = result.map((item) => ({
      _id: item.followingId._id,
      name: item.followingId.name,
      loginId: item.followingId.loginId,
    }));
    return res.status(200).json({
      status: 200,
      success: true,
      source: "getFollowListController.js/handleFollowingList",
      type: "Following List 조회 성공",
      message: "Following List 조회 성공",
      result: transformedResult,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      source: "getFollowListController.js/handleFollowingList",
      type: "Following List 조회 실패",
      message: "Following List 조회 실패",
    });
  }
};
const handleFollowerList = async (req, res) => {
  //const { _id } = req.userInfo;
  const _id = req.params.user_id;
  console.log(_id);
  if (!_id) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "getFollowListController.js/handleFollowerList",
      type: "Follower List 조회 실패",
      message: "body 내용 불충분",
    });
  }
  try {
    //follower 중인 사람들 검색
    const result = await Follow.find({
      followingId: _id,
    }).populate("followerId", "name");
    // [{_id,name},...} 형식으로 변경
    const transformedResult = result.map((item) => ({
      _id: item.followerId._id,
      loginId: item.followerId.loginId,
      name: item.followerId.name,
    }));
    return res.status(200).json({
      status: 200,
      success: true,
      source: "getFollowListController.js/handleFollowerList",
      type: "Follower List 조회 성공",
      message: "Follower List 조회 성공",
      result: transformedResult,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      source: "getFollowListController.js/handleFollowerList",
      type: "Follower List 조회 실패",
      message: "Follower List 조회 실패",
    });
  }
};
module.exports = { handleFollowingList, handleFollowerList };
