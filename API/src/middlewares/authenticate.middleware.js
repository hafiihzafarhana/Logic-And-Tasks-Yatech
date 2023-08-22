const expressAsyncHandler = require("express-async-handler");
const { verifyAccessToken } = require("./../utils/jwt.util");
const { HttpExceptionUnauthorize } = require("./../exception/httpException");
const UserSession = require("./../models/userSession.model");

// implement UserInterface to Request
const authenticate = expressAsyncHandler(async (req, res, next) => {
  const bearer = req.header("Authorization");
  if (!bearer) {
    throw new HttpExceptionUnauthorize("Authorization header missing");
  }

  // check token exist
  const token = bearer.split(" ")[1];
  if (!token)
    throw new HttpExceptionUnauthorize(
      "Unauthorized. Please login to continue."
    );
  const decodedToken = verifyAccessToken(token);

  if (!decodedToken?.session_id) {
    throw new HttpExceptionUnauthorize(
      "Unauthorized. Please login to continue."
    );
  }

  const user = await UserSession.findOne({
    where: {
      user_id: decodedToken.user_id,
      status: "ACTIVE",
      id: decodedToken.session_id,
    },
  });

  if (!user) {
    throw new HttpExceptionUnauthorize(
      "Unauthorized. Please login to continue."
    );
  }

  // store to req.user
  req.user = {
    user_id: decodedToken?.user_id,
    role_id: decodedToken?.role_id,
  };

  next();
});

module.exports = authenticate;
