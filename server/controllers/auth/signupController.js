const User = require("../../model/User");

const handleSignup = async (req, res) => {
  const { id, name, email, password } = req.body;

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
    // Do something with the data
    res.status(201).json({
      success: true,
      status: 201,
      message: `user signup successful`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      source: "signupController/handleSignup",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

module.exports = { handleSignup };
