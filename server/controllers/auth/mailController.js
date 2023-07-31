const nodeMailer = require("nodemailer");
const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const trasnporter = require("../../config/mail");
const Auth = require("../../model/Auth");
const handleVerifyMail = async (req, res, next) => {};

const handlePasswordMail = async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      status: 400,
      source: "passwordMailController/handlePasswordMail",
      type: "request body not enough",
      message: "Request body is not enough. Please provide name and email.",
    });
  }
  try {
    const findUser = User.find({ name: name, email: email });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        status: 404,
        source: "passwordMailController/handlePasswordMail",
        type: "not found",
        message: "User not found.",
      });
    }
    // 임시 코드 발행
    const code = Math.random().toString(36).slice(2);
    const newAuth = await Auth.create({
      email,
      code,
      usage: false,
    });
    // 이메일 ASCII 코드로 변환 (naver.com이 문제 될 수 있어서)
    const encodedEmail = [...email].reduce((acc, cur) => {
      return acc + `%${cur.charCodeAt(0).toString(16)}`;
    }, "");
    console.log(encodedEmail);
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "SoundMeOut 비밀번호 변경",
      html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <link>
            <div>비밀번호 변경을 위해 아래 버튼을 클릭해주세요</div>
            <button><a href="http://localhost:3000/auth/find-password/callback?email=${encodedEmail}&code=${code}">비밀번호 변경</a></button>
        </body>
        </html>`,
    };
    const info = await trasnporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({
      success: true,
      status: 200,
      message: "Send email success",
    });
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      source: "passwordMailController/handlePasswordMail",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

module.exports = { handleVerifyMail, handlePasswordMail };
