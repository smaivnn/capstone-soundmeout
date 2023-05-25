const redirectURI = "http://localhost:3500/auth/naver/callback";

const handleNaverLogin = async (req, res) => {
  res.redirect(
    `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${redirectURI}&state=${process.env.NAVER_STATE}`
  );
};

module.exports = { handleNaverLogin };
