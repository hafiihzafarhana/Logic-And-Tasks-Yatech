const { Model, DataTypes } = require("sequelize");
const Role = require("./role.model");
const User = require("./user.model");
const db = require("../database/index");

class UserRole extends Model {}

UserRole.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: new DataTypes.STRING(),
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    role_id: {
      type: new DataTypes.STRING(),
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "user_roles",
    sequelize: db.sequelize,
    timestamps: false,
    freezeTableName: true,
  }
);

User.hasOne(UserRole, { foreignKey: "user_id", as: "user_role" });
UserRole.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});
Role.hasOne(UserRole, {
  foreignKey: "role_id",
  as: "role",
});

User.belongsToMany(Role, { through: UserRole, foreignKey: "user_id" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "role_id" });

module.exports = UserRole;
