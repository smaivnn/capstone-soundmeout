const axios = require("axios");
const User = require("../../model/User");
const { IssueToken } = require("./issueToken");

const redirectURI = process.env.NAVER_REDIRECT_URI;
const handleNaverRedirect = async (req, res) => {
  const { code, state } = req.query;
  const NAVER_GET_TOKEN_URL =
    "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
    process.env.NAVER_CLIENT_ID +
    "&client_secret=" +
    process.env.NAVER_CLEITN_SECRET +
    "&redirect_uri=" +
    redirectURI +
    "&code=" +
    code +
    "&state=" +
    state;
  const NAVER_GET_USERINFO_URL = "https://openapi.naver.com/v1/nid/me";

  //code로 token 요청
  const getToken = await axios.get(NAVER_GET_TOKEN_URL, {
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.NAVER_CLEITN_SECRET,
    },
  });
  if (!getToken) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "네이버 로그인 실패",
      type: "Invalid code",
    });
  }

  const accessToken = getToken.data.access_token;
  const getUserInfo = await axios.get(NAVER_GET_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(getUserInfo);
  if (!getUserInfo) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "네이버 로그인 실패",
      type: "Invalid access token",
    });
  }
  const email = getUserInfo.data.response.email;
  console.log(email);
  console.log(getUserInfo.data.response);
  try {
    let findUser = await User.findOne({ email: email });
    if (!findUser) {
      findUser = new User({
        loginId: getUserInfo.data.response.id,
        name: getUserInfo.data.response.name,
        email: email,
        password: "NaverUserPassword",
        "OAuth.provider": "naver",
        roles: [2001],
        enabled: true,
      });
      await findUser.save();
    }
    const tokens = await IssueToken(findUser);
    findUser.refreshToken = tokens.refreshToken;
    findUser.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "성공적인 로그인",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "네이버 로그인 실패",
      type: "not registered user",
    });
  }
};

module.exports = { handleNaverRedirect };
