const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req._id = decoded._id;
    next();
  } catch (error) {
    // 액세스 토큰이 만료된 경우
    if (error.name === "TokenExpiredError") {
      // 리프레시 토큰 가져오기
      const refreshToken = req.cookies.refreshToken;
      // 리프레시 토큰이 없는 경우
      if (!refreshToken) {
        return res
          .status(401)
          .json({ success: false, message: "Refresh token not provided" });
      }

      try {
        // 리프레시 토큰 검증
        const decodedRefreshToken = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        // 새로운 액세스 토큰 발급
        const newAccessToken = jwt.sign(
          { _id: decodedRefreshToken._id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "10s",
            issuer: "soundmeout",
          }
        );

        // 새로운 액세스 토큰을 헤더에 설정
        res.setHeader("Authorization", newAccessToken);

        // 유저 정보를 req.user에 저장
        req.user = { _id: decodedRefreshToken._id };

        next();
      } catch (refreshTokenError) {
        // 리프레시 토큰이 유효하지 않은 경우
        return res
          .status(403)
          .json({ success: false, message: "Invalid refresh token" });
      }
    } else {
      // 액세스 토큰이 유효하지 않은 경우
      return res
        .status(403)
        .json({ success: false, message: "Invalid access token" });
    }
  }
};
module.exports = { verifyToken };
