const User = require("../../model/User");
const axios = require("axios");

const { IssueToken } = require("./issueToken");

const handleGoogleRedirect = async (req, res) => {
  const GOOGLE_GET_TOKEN_URL = `https://oauth2.googleapis.com/token`;
  const GOOGLE_GET_USERINFO_URL = `https://www.googleapis.com/oauth2/v2/userinfo`;

  const { code } = req.query;

  /**
   * 순서 :
   * 1. code를 통해 토큰을 요청한다.
   * 2. 토큰을 통해 유저 정보를 요청한다.
   * 3. 해당 유저가 존재하지 않으면 생성하는 과정을 갖는다.
   * 4. 해당 유저가 존재하면 accessToken과 refreshToken을 같이 발급한다.
   * 5. 페이지 리다이렉션을 진행한다.
   */

  // 1. code를 통해 토큰을 요청한다.
  const GetToken = await axios.post(GOOGLE_GET_TOKEN_URL, {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: `http://localhost:3500/auth/google/redirect`,
    grant_type: `authorization_code`,
    access_type: `offline`,
  });

  // 2. 토큰을 통해 유저 정보를 요청한다.
  let accessToken = GetToken.data.access_token;
  let refreshToken;
  const GetUserInfo = await axios.get(GOOGLE_GET_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  try {
    let foundUser = await User.findOne({ email: GetUserInfo.email });
    if (!foundUser) {
      // 3. 해당 유저가 존재하지 않으면 생성하는 과정을 갖는다.
      foundUser = new User({
        loginId: GetUserInfo.data.id,
        name: GetUserInfo.data.name,
        email: GetUserInfo.data.email,
        password: "GoogleUserPassword",
        "OAuth.provider": "google",
        roles: [2001],
        enabled: true,
      });
    }

    // 해당 유저가 존재하면 accessToken과 refreshToken을 같이 발급한다.
    const tokens = await IssueToken(foundUser);
    foundUser.refreshToken = tokens.refreshToken;
    foundUser.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 86400초(하루)
      secure: true,
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "성공적인 로그인",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    // accessToken 만료일때 에러 설정하기. > middleware로 변경
  }
};

module.exports = { handleGoogleRedirect };
