const Paper = require("../../model/Paper");


const handleCreatePaper = async (req, res) => {
  const { _id, loginId, email, name, roles } = req.userInfo;
  const { text } = req.body;

  console.log(_id, loginId, email, name, roles);
  console.log(text);



  res.status(200).json({ success: true });
};

module.exports = { handleCreatePaper };
