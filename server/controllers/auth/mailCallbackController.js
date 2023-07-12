const User = require("../../model/User");
const Auth = require("../../model/Auth");

const handlePasswordMailCallback = async (req, res, next) => {
  const { email, code } = req.query;
  if (!email || !code) {
    return res.status(400).json({
      success: false,
      status: 400,
      source: "passwordMailController/handlePasswordMailCallback",
      type: "request query not enough",
      message: "Request query is not enough. Please provide email and code.",
    });
  }
  try {
    const foundAuth = await Auth.findOne({
      email: email,
      code: code,
      usage: false,
    });
    if (!foundAuth) {
      return res.status(404).json({
        success: false,
        status: 404,
        source: "passwordMailController/handlePasswordMailCallback",
        type: "not found",
        message: "Auth not found.",
      });
    }
    const now = new Date();
    const authCreatedAt = new Date(foundAuth.createdAt);
    const diff = now - authCreatedAt;
    const diffMin = Math.floor(diff / 60000);
    if (diffMin > 5) {
      return res.status(400).json({
        success: false,
        status: 400,
        source: "passwordMailController/handlePasswordMailCallback",
        type: "expired",
        message: "Auth code is expired.",
      });
    }
    foundAuth.usage = true;
    await foundAuth.save();

    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        status: 404,
        source: "passwordMailController/handlePasswordMailCallback",
        type: "not found",
        message: "User not found.",
      });
    }
    const accessToken = jwt.sign(
      {
        userInfo: {
          _id: foundUser._id,
          loginId: foundUser.loginId,
          email: foundUser.email,
          name: foundUser.name,
          roles: foundUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
        issuer: "soundmeout",
      }
    );
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Auth code is valid.",
      accessToken: accessToken,
    });
  } catch (error) {}
};

module.exports = { handlePasswordMailCallback };
