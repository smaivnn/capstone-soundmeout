const handleGoogleLogin = async (req, res) => {
  const GOOGLE_CLIENT_ID =
    "382152492559-0t3t9qleql25qd1v08h1onq0gj1vqm8p.apps.googleusercontent.com";
  const GOOGLE_CLIENT_SECRET = "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";
  const GOOGLE_REDIRECT_URL = `http://localhost:3500/auth/google/redirect`;

  let url = `https://accounts.google.com/o/oauth2/v2/auth`;
  url += `?client_id=${GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${GOOGLE_REDIRECT_URL}`;
  url += `&response_type=code`;
  url += `&scope=email profile`;

  res.redirect(url);
};

module.exports = { handleGoogleLogin };
