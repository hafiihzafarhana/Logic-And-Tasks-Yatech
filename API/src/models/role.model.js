const { Model, DataTypes } = require("sequelize");
const db = require("../database/index");

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    role_name: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    tableName: "roles",
    sequelize: db.sequelize,
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Role;
