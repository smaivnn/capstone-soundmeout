const Topic = require("../../model/Topic");
const Paper = require("../../model/Paper");
const User = require("../../model/User");

/**
 * 수정
 * 1. 토픽에서 author파악하기
 *
 * 사용법 바뀜
 * 클라이언트에서는 params로 topic의 Id와 body에 endPoint만 보내주면 됨.
 * searchUser 보낼 필요 X
 *
 * 추후에 반환 내역, 유효처리 및 중복 코드 리팩토링 예정
 */

// 프론트에서 토픽아이디랑 엑세스토큰, 엔드포인트 받고
const handlePaperList = async (req, res) => {
  const { topic_id } = req.params;
  const { endPoint } = req.body;
  const userInfo = req?.userInfo;

  let offset = 6;
  let paperArray;

  const foundTopic = await Topic.findOne({ _id: topic_id });
  if (!foundTopic) {
    // foundTopic이 유효하지 않은 경우에 대한 처리
  }

  const foundUser = await User.findOne({ _id: foundTopic.author });
  if (!foundUser) {
    // foundUser가 유효하지 않은 경우에 대한 처리
  }

  // const foundSearchUser = await User.findOne({ loginId: searchUser });
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

  try {
    // 로그인이 되어있고
    if (userInfo !== undefined) {
      // 내가 토픽의 주인이라면 visivle에 상관없이 모든 페이퍼를 다 보여준다
      if (userInfo._id === foundUser._id.toString()) {
        // 엔드포인트가 존재하지 않으면
        if (!endPoint) {
          paperArray = await Paper.find(
            {
              topic: topic_id,
              delete: false,
            }
            // { text: 1, comment: 1 }
          )
            .sort({ createdAt: -1 })
            .limit(offset)
            .exec();
        } else {
          // 엔드포인트가 존재한다면
          paperArray = await Paper.find(
            {
              topic: topic_id,
              createdAt: { $lt: foundEndPoint.createdAt },
            }
            // { text: 1, comment: 1 }
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
      } else {
        // 내가 토픽의 주인이 아니라면
        // visible true인 것 모두와 내가 쓴 것 모두를 보이게 한다.
        if (!endPoint) {
          // 엔드포인트가 없다면
          paperArray = await Paper.find(
            {
              topic: topic_id,
              $or: [{ visible: true }, { author: userInfo._id }],
              delete: false,
            }
            // { text: 1, comment: 1 }
          )
            .sort({ createdAt: -1 })
            .limit(offset)
            .exec();
        } else {
          // 엔드포인트가 존재한다면
          paperArray = await Paper.find(
            {
              topic: topic_id,
              $or: [{ visible: true }, { author: userInfo._id }],
              delete: false,
              createdAt: { $lt: foundEndPoint.createdAt },
            }
            // { text: 1, comment: 1 }
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

    // 로그인이 되어있지 않고
    if (!endPoint) {
      paperArray = await Paper.find(
        {
          topic: topic_id,
          visible: true,
          delete: false,
        }
        // { text: 1, comment: 1 }
      )
        .sort({ createdAt: -1 })
        .limit(offset)
        .exec();
    } else {
      paperArray = await Paper.find(
        {
          topic: topic_id,
          visible: true,
          delete: false,
          createdAt: { $lt: foundEndPoint.createdAt },
        }
        // { text: 1, comment: 1 }
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
