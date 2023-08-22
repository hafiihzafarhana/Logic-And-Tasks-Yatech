const UserSession = require("../models/userSession.model");

class UserSessionRepository {
  async findSessionByUserId(user_id) {
    return await UserSession.findOne({
      where: {
        user_id: user_id,
        status: "ACTIVE",
      },
    });
  }

  async createUserSession(sessionPayload) {
    return await UserSession.create(sessionPayload);
  }

  async findSessionByAccToken(acctoken) {
    return await UserSession.findOne({
      where: { access_token: acctoken, status: "ACTIVE" },
    });
  }
}

module.exports = UserSessionRepository;
