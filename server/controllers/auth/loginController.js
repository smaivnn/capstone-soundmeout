const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { IssueToken } = require("./issueToken");

const handleLogin = async (req, res, next) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({
      success: false,
      status: 400,
      source: "loginController/handleLogin",
      type: "로그인 실패",
      message: "request body is not enough.",
    });
  }

  try {
    const findUser = await User.findOne({ loginId: id });
    if (!findUser) {
      return res.status(400).json({
        loginSuccess: false,
        source: "loginController/handleLogin",
        type: "로그인 실패",
        message: "user does not exist",
      });
    }
    match = await bcrypt.compare(password, findUser.password);
    if (match) {
      // token 발급
      const token = await IssueToken(findUser);
      findUser.refreshToken = token.refreshToken;
      const result = await findUser.save();

      res.cookie("refreshToken", token.refreshToken, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14일
        secure: true,
      });
      res.status(201).json({
        status: 201,
        success: true,
        message: "성공적인 로그인",
        access_token: token.accessToken,
      });
    } else {
      return res.status(400).json({
        status: 400,
        succes: false,
        message: "wrong password",
        type: "로그인 실패",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      status: 500,
      source: "loginController/handleLogin",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

const handleFindPassword = async (req, res, next) => {};

module.exports = { handleLogin, handleFindPassword };
