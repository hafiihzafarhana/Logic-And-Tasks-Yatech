require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: "development",
  USER_ID: process.env.USER_ID,
  JWT_SECRET_KEY_REFRESH: process.env.JWT_SECRET_KEY_REFRESH,
  JWT_SECRET_KEY_ACCESS: process.env.JWT_SECRET_KEY_ACCESS,
  JWT_ACC_TIME: process.env.JWT_ACC_TIME,
  JWT_REFRESH_TIME: process.env.JWT_REFRESH_TIME,
};
