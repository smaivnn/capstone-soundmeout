const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const IssueToken = async (userInfo) => {
  const accessToken = jwt.sign(
    {
      userInfo: {
        loginId: userInfo.loginId,
        email: userInfo.email,
        name: userInfo.name,
        roles: userInfo.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );

  const refreshToken = jwt.sign(
    {
      loginId: userInfo.loginId,
      email: userInfo.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  return { accessToken, refreshToken };
};

module.exports = { IssueToken };
