const express = require("express");
const cors = require("cors");
const AuthApi = require("./api/auth.api");
const UserApi = require("./api/user.api");
const errorHandler = require("./exception/errorHandler");

module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));
  const rootLink = "/api";
  // api
  AuthApi(app, rootLink);
  UserApi(app, rootLink);

  // Error handler
  app.use(errorHandler);
};
