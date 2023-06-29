const Paper = require("../../model/Paper");
const Topic = require("../../model/Topic");

const handleCreatePaper = async (req, res) => {
  const { _id } = req.userInfo;
  const { topic_id, text, redirectPath = "/home" } = req.body;

  if (!_id || !topic_id || !text) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "createPaperController.js/handleCreatePaper",
      type: "Paper 생성 실패",
      message: "body 내용 불충분",
    });
  }
  try {
    // topic_id를 찾아보고 만약 해당하는 topic이 없다면 paper생성 불가하게 하기.
    const foundTopic = await Topic.findOne({
      _id: topic_id,
      delete: false,
      visible: true,
    });

    if (!foundTopic) {
      res.status(400).json({
        success: false,
        status: 400,
        source: "createPaperController.js/handleCreatePaper",
        type: "topic이 존재하지 않음",
        message: `해당하는 topic 없음. delete, visible 체크`,
      });
    } else {
      const newPaper = await Paper.create({
        text,
        author: _id,
        topic: topic_id,
        visible: false,
      });

      return res.status(200).json({
        status: 200,
        success: true,
        message: "성공적인 조회",
        redirectPath: redirectPath,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      source: "createPaperController.js/handleCreatePaper",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

module.exports = { handleCreatePaper };
