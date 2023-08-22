const UserService = require("./../services/user.service");
const authenticate = require("./../middlewares/authenticate.middleware");
const authorize = require("./../middlewares/authorize.middleware");
const { USER_ID } = require("./../config/constant");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("./../utils/apiResponse.util");

module.exports = (app, rootLink) => {
  const route = `${rootLink}/users`;
  const authService = new UserService();
  app.get(
    `${route}/me`,
    authenticate,
    authorize(USER_ID),
    async (req, res, next) => {
      try {
        const getMeResponse = await authService.getMe(req.user.user_id);
        return res
          .status(status.OK)
          .json(apiResponse(status.OK, "OK", "Get Me", getMeResponse));
      } catch (err) {
        next(err);
      }
    }
  );
};
