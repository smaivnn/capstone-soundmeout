require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const logger = require("./config/logger");
const morganMiddleware = require("./utils/middleware/morgan");
const credentials = require("./utils/middleware/credentials");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.js");
const requestIp = require("request-ip");
const connectDB = require("./config/dbConn");

const PORT = process.env.PORT || 3500;
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// built-in middleware to handle urlencoded form data and for json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use(morganMiddleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", require("./routes/auth"));
app.use("/topic", require("./routes/topic"));
app.use("/paper", require("./routes/paper"));
app.use("/noti", require("./routes/noti"));
app.use("/follow", require("./routes/follow"));
app.use("/user", require("./routes/user"));
app.use("/", (req, res) => {
  conosol.log("ip", requestIp.getClientIp(req));
  return res.status(200).json({ message: "Welcome to SoundMeOut API!" });
});

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
