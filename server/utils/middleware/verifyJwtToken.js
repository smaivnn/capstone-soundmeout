const jwt = require("jsonwebtoken");
const User = require("../../model/User");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: 403,
        success: false,
        message: "토큰 인증 실패",
        type: "Invalid access token",
      });
    }
    req._id = decoded._id;
    next();
  });
};
module.exports = { verifyToken };
