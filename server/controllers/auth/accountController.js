const User = require("../../model/User");
const bcrypt = require("bcrypt");

const handleDeleteAccount = async (req, res, next) => {
  // 2차 검증을 위한 password 확인
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({
      success: false,
      status: 400,
      source: "accountController/handleDeleteAccount",
      type: "request body not enough",
      message: "Request body is not enough. Please provide password.",
    });
  }
  try {
    const findUser = await User.findOne({ _id: req.userInfo._id });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        status: 404,
        source: "accountController/handleDeleteAccount",
        type: "not found",
        message: "User not found.",
      });
    }

    // check password
    const match = await bcrypt.compare(password, findUser.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        status: 400,
        source: "accountController/handleDeleteAccount",
        type: "password not match",
        message: "Password not match.",
      });
    }

    // delete account
    findUser.enabled = false;
    await findUser.save();

    res.status(200).json({ success: true, message: "Delete account success" });

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      source: "accountController/handleDeleteAccount",
      type: "server error",
      message: `Internal server error`,
    });
  }
};
const handleUpdatePassword = async (req, res, next) => {
  // 2차 검증을 위한 password 확인
  const { password, newPassword } = req.body;

  if (!password || !newPassword) {
    return res.status(400).json({
      success: false,
      status: 400,
      source: "accountController/handleUpdatePassword",
      type: "request body not enough",
      message: "Request body is not enough. Please provide password.",
    });
  }
  try {
    console.log(req._id);
    const findUser = await User.findOne({ _id: req.userInfo._id });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        status: 404,
        source: "accountController/handleUpdatePassword",
        type: "not found",
        message: "User not found.",
      });
    }
    // check password
    const match = await bcrypt.compare(password, findUser.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        status: 400,
        source: "accountController/handleDeleteAccount",
        type: "password not match",
        message: "Password not match.",
      });
    }
    // update password
    findUser.password = bcrypt.hashSync(newPassword, 10);
    await findUser.save();

    res.status(200).json({ success: true, message: "Update password success" });
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      source: "accountController/handleUpdatePassword",
      type: "server error",
      message: `Internal server error`,
    });
  }
};
module.exports = { handleDeleteAccount, handleUpdatePassword };
