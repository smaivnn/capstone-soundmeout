const User = require("../../model/User");
const Auth = require("../../model/Auth");
const { IssueToken } = require("./issueToken");

const handlePasswordMailCallback = async (req, res, next) => {
  const { email, code } = req.query;
  if (!email || !code) {
    return res.status(400).json({
      success: false,
      status: 400,
      source: "passwordMailController/handlePasswordMailCallback",
      type: "request query not enough",
      message: "Request query is not enough. Please provide email and code.",
    });
  }
  // ASCII 이메일 코드를 다시 문자열로 변환
  // const decodedEmail = [...email].reduce((acc, cur) => {
  //   return acc + String.fromCharCode(parseInt(cur, 16));
  // }, "");
  // console.log(decodedEmail);
  try {
    const foundAuth = await Auth.findOne({
      email: email,
      code: code,
    });
    if (!foundAuth) {
      return res.status(404).json({
        success: false,
        status: 404,
        source: "passwordMailController/handlePasswordMailCallback",
        type: "not found",
        message: "Auth not found.",
      });
    }
    // 이미 사용된 코드인지 확인
    if (foundAuth.usage) {
      return res.status(400).json({
        success: false,
        status: 400,
        source: "passwordMailController/handlePasswordMailCallback",
        type: "already used",
        message: "Auth code is already used.",
      });
    }
    const now = new Date();
    const authCreatedAt = new Date(foundAuth.createdAt);
    const diff = now - authCreatedAt;
    const diffMin = Math.floor(diff / 60000);
    if (diffMin > 5) {
      return res.status(400).json({
        success: false,
        status: 400,
        source: "passwordMailController/handlePasswordMailCallback",
        type: "expired",
        message: "Auth code is expired.",
      });
    }
    foundAuth.usage = true;
    await foundAuth.save();
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        status: 404,
        source: "passwordMailController/handlePasswordMailCallback",
        type: "not found",
        message: "User not found.",
      });
    }
    const userInfo = {
      loginId: foundUser.loginId,
      email: foundUser.email,
      name: foundUser.name,
      roles: foundUser.roles,
    };
    const { accessToken } = await IssueToken(userInfo);
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Auth code is valid.",
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      source: "passwordMailController/handlePasswordMailCallback",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

module.exports = { handlePasswordMailCallback };
