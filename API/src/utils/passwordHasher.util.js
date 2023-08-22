const bcryptjs = require("bcryptjs");

class PasswordHasher {
  static async hashPassword(password) {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
  }

  static async comparePassword(password, hashedPassword) {
    const isPasswordMatch = await bcryptjs.compare(password, hashedPassword);
    return isPasswordMatch;
  }
}

module.exports = PasswordHasher;
