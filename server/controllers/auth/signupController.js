const User = require("../../model/User");
const bcrypt = require("bcrypt");

const handleSignup = async (req, res, next) => {
  const { id, name, email, password } = req.body;
  console.log(id, name, email, password);
  if (!id || !name || !email || !password) {
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
    const user = await User.create({
      name,
      loginId: id,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    res.status(201).json({
      success: true,
      status: 201,
      message: `user signup successful`,
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
