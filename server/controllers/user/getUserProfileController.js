const User = require("../../model/User");

const handleUserProfile = async (req, res) => {
  const { loginId } = req.params;
  if (!loginId) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "getUserProfileController.js/handleUserProfile",
      type: " 조회 실패",
      message: "request body not enough.",
    });
  }

  try {
    const foundUser = await User.findOne({ loginId });
    if (!foundUser) {
      return res.status().json({});
    }
    return res.status(200).json({
      status: 200,
      success: true,
      message: "성공적인 조회",
      userObject: {
        name: foundUser.name,
        loginId: foundUser.loginId,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      source: "getUserProfileController.js/handleUserProfile",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

module.exports = { handleUserProfile };
