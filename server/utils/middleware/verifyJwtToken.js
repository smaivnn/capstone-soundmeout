const jwt = require("jsonwebtoken");
const User = require("../../model/User");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req._id = decoded._id;
    next();
  } catch (error) {
    // accessToken expires
    if (error.name === "TokenExpiredError") {
      const refreshToken = req.cookies.refreshToken;
      // no refreshToken
      if (!refreshToken) {
        return res
          .status(401)
          .json({ success: false, message: "Refresh token not provided" });
      }

      try {
        const findUser = await User.findOne({ refreshToken: refreshToken });

        const decodedRefreshToken = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        if (decodedRefreshToken._id !== findUser._id.toString())
          return res
            .status(403)
            .json({ success: false, message: "Invalid refresh token" });

        const newAccessToken = jwt.sign(
          { _id: findUser._id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1h",
            issuer: "soundmeout",
          }
        );
        const newRefreshToken = jwt.sign(
          { _id: findUser._id },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "14d",
            issuer: "soundmeout",
          }
        );

        findUser.refreshToken = newRefreshToken;
        await findUser.save();
        res.cookie("refreshToken", newRefreshToken, {
          maxAge: 14 * 24 * 60 * 60 * 1000, // 14일
        });
        req._id = decodedRefreshToken._id;
        next();
      } catch (refreshTokenError) {
        return res
          .status(403)
          .json({ success: false, message: "Invalid refresh token" });
      }
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Invalid access token" });
    }
  }
};
module.exports = { verifyToken };
