const User = require("../../model/User");
const bcrypt = require("bcrypt");

const handleSignup = async (req, res, next) => {
  const { loginId, name, email, password } = req.body;
  console.log(loginId, name, email, password);
  if (!loginId || !name || !email || !password) {
    return res.status(400).json({
      success: false,
      status: 400,
      source: "signupController/handleSignup",
      type: "request body not enough",
      message:
        "Request body is not enough. Please provide id, name, email and password.",
    });
  }

  try {
    const findUser = await User.findOne({ loginId });
    if (findUser) {
      return res.status(400).json({
        success: false,
        status: 400,
        source: "signupController/handleSignup",
        type: "이메일 중복",
        message: "id already exists",
      });
    }

    const user = await User.create({
      name,
      loginId,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    res.status(201).json({
      success: true,
      status: 201,
      message: `성공적인 회원가입`,
    });
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      source: "signupController/handleSignup",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

module.exports = { handleSignup };
