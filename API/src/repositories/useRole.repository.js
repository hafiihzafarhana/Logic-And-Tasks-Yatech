const UserRole = require("./../models/userRole.model");

class UserRoleRepository {
  async createUserRole(userData) {
    await UserRole.create(userData);
  }
}

module.exports = UserRoleRepository;
