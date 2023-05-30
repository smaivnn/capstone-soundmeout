const Paper = require("../../model/Paper");
const Comment = require("../../model/Comment");

const handleCreateComment = async (req, res) => {
  const { _id } = req.userInfo;
  const { text, paper_id } = req.body;
  if (!_id || !text || !paper_id) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "createCommentController.js/handleCreateComment",
      type: "Comment 생성 실패",
      message: "body 내용 불충분",
    });
  }

  try {
    const foundPaperPromise = await Paper.findOne({ _id: paper_id });
    if (foundPaper.comment.length >= 1) {
      return res.status(400).json({
        status: 400,
        success: false,
        source: "createCommentController.js/handleCreateComment",
        type: "Comment 생성 실패",
        message: "body 내용 불충분",
      });
    }

    const newCommentPromise = new Comment({
      text,
      author: _id,
      visible: true,
      delete: false,
    });

    const [foundPaper, newComment] = Promise.all([
      foundPaperPromise,
      newCommentPromise,
    ]);

    foundPaper.comment.push(newPaper);

    const result = Promise.all([newPaper.save(), foundPaper.save()]);
  } catch (error) {}
};

module.exports = { handleCreateComment };
