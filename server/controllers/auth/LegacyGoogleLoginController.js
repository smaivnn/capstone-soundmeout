/**
 *
 *
 *  이 controller는 더이상 쓰이지 않으나
 *  추후 리팩토링 과정에서 쓰일 수 있기에
 *  남겨놓음.
 *
 */

const handleGoogleLogin = async (req, res) => {
  let url = `https://accounts.google.com/o/oauth2/v2/auth`;
  url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}`;
  url += `&response_type=code`;
  url += `&scope=email profile`;

  return res.redirect(url);
};

module.exports = { handleGoogleLogin };
