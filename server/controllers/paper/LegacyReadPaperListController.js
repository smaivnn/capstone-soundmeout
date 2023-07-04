const Paper = require("../../model/Paper");
const User = require("../../model/User");

// 프론트에서 토픽아이디랑 엑세스토큰, 엔드포인트 받고
const handlePaperList = async (req, res) => {
  const { topic_id } = req.params;
  const { endPoint, searchUser } = req.body;
  const userInfo = req?.userInfo;

  let offset = 6;
  let paperArray;

  const foundUser = await User.findOne({ loginId: searchUser });
  const foundEndPoint = await Paper.findOne({ topic: topic_id, _id: endPoint });

  if (!topic_id) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "readPaperListController.js/handlePaperList",
      type: "Paper 읽기 실패",
      message: "body 내용 불충분",
    });
  }

  if (!foundUser) {
    return res.status(400).json({
      loginSuccess: false,
      source: "readPaperListController/handlePaperList",
      type: "유저 검색 실패",
      message: "user does not exist",
    });
  }

  const foundUserIdString = foundUser._id.toString();

  try {
    // 로그인 되어었고, 내 페이퍼라면
    // 해당 토픽에 종속 되어있는 지우지 않은 내 페이퍼들을 모두 보인다.
    if (userInfo !== undefined) {
      if (userInfo._id === foundUserIdString) {
        if (!endPoint) {
          paperArray = await Paper.find(
            {
              topic: topic_id,
              author: userInfo._id,
              delete: false,
            },
            { text: 1, comment: 1 }
          )
            .sort({ createdAt: -1 })
            .limit(offset)
            .exec();
        } else {
          paperArray = await Paper.find(
            {
              topic: topic_id,
              author: userInfo._id,
              delete: false,
              createdAt: { $lt: foundEndPoint.createdAt },
            },
            { text: 1, comment: 1 }
          )
            .sort({ createdAt: -1 })
            .limit(offset)
            .exec();
        }
        return res.status(201).json({
          status: 201,
          success: true,
          message: "성공적인 조회",
          paperArray,
        });
      }
    }

    if (!endPoint) {
      paperArray = await Paper.find(
        {
          topic: topic_id,
          author: foundUserIdString,
          visible: true,
          delete: false,
        },
        { text: 1, comment: 1 }
      )
        .sort({ createdAt: -1 })
        .limit(offset)
        .exec();
    } else {
      paperArray = await Paper.find(
        {
          topic: topic_id,
          author: foundUserIdString,
          visible: true,
          delete: false,
          createdAt: { $lt: foundEndPoint.createdAt },
        },
        { text: 1, comment: 1 }
      )
        .sort({ createdAt: -1 })
        .limit(offset)
        .exec();
    }

    return res.status(201).json({
      status: 201,
      success: true,
      message: "성공적인 조회",
      paperArray,
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
