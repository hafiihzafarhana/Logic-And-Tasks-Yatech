const { isEmpty } = require("./../utils/isEmpty.util");
const { HttpExceptionBadRequest } = require("./../exception/httpException");
const UserRepository = require("./../repositories/user.repository");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getMe(id) {
    if (isEmpty(id)) throw new HttpExceptionBadRequest("Empty id");

    const data = await this.userRepository.findUserById(id);
    if (!data) {
      throw new HttpExceptionNotFound("User not found");
    }

    return data;
  }
}

module.exports = UserService;
