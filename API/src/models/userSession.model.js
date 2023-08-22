const { DataTypes, Model } = require("sequelize");
const User = require("./user.model");
const db = require("../database/index");

class UserSession extends Model {}

UserSession.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    access_token: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    refresh_token: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
  },
  {
    tableName: "user_sessions",
    sequelize: db.sequelize,
    timestamps: true,
    freezeTableName: true,
  }
);

User.hasOne(UserSession, {
  sourceKey: "id",
  foreignKey: "user_id",
  as: "user_session_2",
});

UserSession.belongsTo(User, {
  targetKey: "id",
  foreignKey: "user_id",
  as: "user_session_2",
});

module.exports = UserSession;
