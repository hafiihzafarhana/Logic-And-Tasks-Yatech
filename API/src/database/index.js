const config = require("./../config/db.js");
const { NODE_ENV } = require("./../config/constant.js");
const Sequelize = require("sequelize");

const dbConfig = config[NODE_ENV] || config["development"];
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const db = {
  sequelize,
  Sequelize,
};

module.exports = db;
