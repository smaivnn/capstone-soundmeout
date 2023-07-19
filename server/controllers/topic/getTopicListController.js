const User = require("../../model/User");
const Topic = require("../../model/Topic");

const handleTopicList = async (req, res) => {
  const { searchUser, endPoint } = req.body;
  const userInfo = req?.userInfo;

  let offset = 6;
  let topicArray;

  const [foundUser, foundEndPoint] = await Promise.all([
    User.findOne({ loginId: searchUser }),
    Topic.findOne({ _id: endPoint }),
  ]);

  if (!foundUser) {
    return res.status(400).json({
      loginSuccess: false,
      source: "getTopicListController/handleTopicList",
      type: "유저 검색 실패",
      message: "user does not exist",
    });
  }

  const foundUserIdString = foundUser._id.toString();

  if (userInfo !== undefined) {
    // 서치유저와 로그인 유저가 같은지 확인한다.

    if (userInfo._id === foundUserIdString) {
      if (!endPoint) {
        topicArray = await Topic.find({
          author: userInfo._id,
          delete: false,
        })
          .sort({ createdAt: -1 })
          .limit(offset)
          .exec();
      } else {
        topicArray = await Topic.find({
          author: userInfo._id, // searchUser에 해당하는 user이면서
          createdAt: { $lt: foundEndPoint.createdAt }, // 해당 유저의 마지막 토픽보다 늦게 만들어진 토픽
          delete: false,
        })
          .sort({ createdAt: -1 })
          .limit(offset)
          .exec();
      }
      return res.status(201).json({ success: true, topicArray });
    }
  }

  try {
    if (!endPoint) {
      topicArray = await Topic.find({
        author: foundUserIdString,
        visible: true,
        delete: false,
      })
        .sort({ createdAt: -1 })
        .limit(offset)
        .exec();
    } else {
      topicArray = await Topic.find({
        author: foundUserIdString,
        createdAt: { $lt: foundEndPoint.createdAt },
        visible: true,
        delete: false,
      })
        .sort({ createdAt: -1 })
        .limit(offset)
        .exec();
    }

    return res.json({ success: true, topicArray });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

module.exports = { handleTopicList };
