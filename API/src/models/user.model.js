const { Model, DataTypes } = require("sequelize");
const db = require("../database/index"); // Gantilah dengan path yang sesuai

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(),
    },
    full_name: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    user_name: {
      type: new DataTypes.STRING(),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize: db.sequelize,
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = User;
