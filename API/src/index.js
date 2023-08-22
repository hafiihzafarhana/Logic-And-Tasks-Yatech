const express = require("express");
const { PORT } = require("./config/constant");
const server = require("./server");
const db = require("./database/index");

const StartServer = async () => {
  const app = express();

  await db.sequelize.sync({ force: false });

  await server(app);

  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`listening to port ${PORT}`);
  });
};

StartServer();
