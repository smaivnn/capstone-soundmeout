const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const { IssueToken } = require("./issueToken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.refreshToken)
    return res.status(400).json({
      status: 403,
      success: false,
      message: "토큰 재발급 실패",
      type: "Refresh token not provided",
    });
  const refreshToken = cookies.refreshToken;
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  const findUser = await User.findOne({ refreshToken: refreshToken });

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err || findeUser._id.toString() !== decoded._id) {
        return res.status(403).json({
          status: 403,
          success: false,
          message: "토큰 재발급 실패",
          type: "Invalid refresh token",
        });
      }
      const tokens = await IssueToken(findUser);
      findUser.refreshToken = tokens.refreshToken;
      const result = await findUser.save();

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14일
        secure: true,
      });
      return res.status(200).json({
        status: 200,
        success: true,
        message: "토큰 재발급 성공",
        access_token: tokens.accessToken,
      });
    }
  );
};
module.exports = { handleRefreshToken };
