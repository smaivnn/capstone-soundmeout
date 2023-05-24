const axios = require("axios");
const User = require("../../model/User");
const { IssueToken } = require("./issueToken");

const handleKakaoLogin = async (req, res) => {
  const CODE = req.body.code;
  const ID = process.env.KAKAO_ID;
  const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
  const getTokenURL = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${ID}&redirect_uri=${REDIRECT_URI}&code=${CODE}`;
  const getUserInfoURL = `https://kapi.kakao.com//v2/user/me`;

  try {
    // 토큰 발급받기
    const tokenResponse = await axios.post(
      getTokenURL,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const accessToken = tokenResponse.data.access_token;
    const refreshToken = tokenResponse.data.refresh_token;

    /**토큰이 발급 된다면, 해당 토큰을 통해 유저가 서비스에 가입되어있는지 확인한다.*/
    if (accessToken) {
      const userInfoResponse = await axios.get(getUserInfoURL, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // email을 통해 user를 찾는다.
      let foundUser = await User.findOne({
        email: userInfoResponse.data.kakao_account.email,
      });
      // 유저가 없다면 새로 생성한다.
      // 새로 만들어서 해당 유저를 foundUser로 만들기.
      if (!foundUser) {
        foundUser = new User({
          loginId: userInfoResponse.data.id,
          name: userInfoResponse.data.kakao_account.profile.nickname,
          email: userInfoResponse.data.kakao_account.email,
          password: "kakaoUserPassword",
          "OAuth.provider": "kakao",
          roles: [2001],
          enabled: true,
        });
      }

      const tokens = await IssueToken(foundUser);
      //유저가 있다면 refreshToken을 갱신해준다.
      foundUser.refreshToken = tokens.refreshToken;
      foundUser.save();

      // 사용하기 위해서는 front에서 withCredential : true를 주어야 한다.
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
    }
  } catch (error) {
    // accessToken 만료일때 에러 설정하기. > middleware로 변경
  }
};

module.exports = { handleKakaoLogin };
