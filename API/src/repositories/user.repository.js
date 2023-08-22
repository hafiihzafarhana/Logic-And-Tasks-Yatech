const UserRole = require("./../models/userRole.model");
const User = require("./../models/user.model");

class UserRepository {
  async findUserByEmailAndDeletedNull(userData) {
    return await User.findOne({
      where: { email: userData.email.toLowerCase(), deleted_at: null },
    });
  }

  async findUserByUsernameAndDeletedNull(userData) {
    return await User.findOne({
      where: { user_name: userData.user_name, deleted_at: null },
    });
  }

  async createUser(userData) {
    return await User.create(userData);
  }

  async findUserByEmail(userData) {
    const data = await User.findOne({
      where: { email: userData.email.toLocaleLowerCase() },
      include: [
        {
          model: UserRole,
          as: "user_role",
        },
      ],
    });
    return data ? data : null;
  }

  async findUserById(user_id) {
    return await User.findOne({
      where: { id: user_id },
      include: [
        {
          model: UserRole,
          as: "user_role",
        },
      ],
    });
  }
}

module.exports = UserRepository;
