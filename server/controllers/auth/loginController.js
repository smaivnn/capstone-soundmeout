const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res, next) => {
  const { loginId, password } = req.body;

  if (!loginId || !password) {
    return res.status(400).json({
      success: false,
      status: 400,
      source: "loginController/handleLogin",
      type: "로그인 실패",
      message: "request body is not enough.",
    });
  }

  try {
    const findUser = await User.findOne({ loginId });
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
      // generate accessToken
      const accessToken = jwt.sign(
        {
          userInfo: {
            _id: findUser._id,
            loginId: findUser.loginId,
            email: findUser.email,
            name: findUser.name,
            roles: findUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
          issuer: "soundmeout",
        }
      );

      //generate refreshToken
      const refreshToken = jwt.sign(
        { _id: findUser.id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "14d",
          issuer: "soundmeout",
        }
      );
      findUser.refreshToken = refreshToken;
      const result = await findUser.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14일
        secure: true,
      });
      res.status(201).json({
        status: 201,
        success: true,
        message: "성공적인 로그인",
        accessToken,
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
