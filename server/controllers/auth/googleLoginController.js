const handleGoogleLogin = async (req, res) => {
  let url = `https://accounts.google.com/o/oauth2/v2/auth`;
  url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}`;
  url += `&response_type=code`;
  url += `&scope=email profile`;

  res.redirect(url);
};

module.exports = { handleGoogleLogin };
