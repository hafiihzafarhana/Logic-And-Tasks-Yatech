const AuthService = require("./../services/auth.service");
const authenticate = require("./../middlewares/authenticate.middleware");
const authorize = require("./../middlewares/authorize.middleware");
const { USER_ID } = require("./../config/constant");

module.exports = (app, rootLink) => {
  const route = `${rootLink}/auth`;
  const authService = new AuthService();
  app.post(`${route}/sign-up`, async (req, res, next) => {
    try {
      const userData = req.body;
      const authResponse = await authService.userRegister(userData);
      return res.json(authResponse);
    } catch (err) {
      next(err);
    }
  });

  app.post(`${route}/sign-in`, async (req, res, next) => {
    try {
      const userData = req.body;
      const authResponse = await authService.userLogin(userData);
      return res.json(authResponse);
    } catch (err) {
      next(err);
    }
  });

  app.post(
    `${route}/refreshing-access-token`,
    authenticate,
    authorize(USER_ID),
    async (req, res, next) => {
      try {
        // const userData = req.body;
        const access_token = req.headers.authorization?.split(" ")[1];
        if (!access_token) {
          throw new HttpExceptionUnauthorize(
            "Unauthorized. Please login to continue."
          );
        }
        const authResponse = await authService.tokenRefresh(access_token);
        return res.json(authResponse);
      } catch (err) {
        next(err);
      }
    }
  );
};
