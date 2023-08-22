const jwt = require("jsonwebtoken");
const {
  JWT_SECRET_KEY_REFRESH,
  JWT_SECRET_KEY_ACCESS,
  JWT_ACC_TIME,
  JWT_REFRESH_TIME,
} = require("./../config/constant");

const SECRET_KEY = JWT_SECRET_KEY_ACCESS;
const REFRESH_SECRET_KEY = JWT_SECRET_KEY_REFRESH;
const ACCESS_TOKEN_EXPIRATION = JWT_ACC_TIME;
const REFRESH_TOKEN_EXPIRATION = JWT_REFRESH_TIME;

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
};

const generateAccessToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
};

const verifyRefreshToken = (refreshToken) => {
  const payload = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
  return payload;
};

const verifyAccessToken = (accessToken) => {
  const payload = jwt.verify(accessToken, SECRET_KEY);
  return payload;
};

module.exports = {
  generateRefreshToken,
  generateAccessToken,
  verifyRefreshToken,
  verifyAccessToken,
};
