/* eslint-disable no-console */
const express = require("express");
const config = require("../config/config");
//const database = require("../config/database");
const app = express();
const utilities = require("../utilities/utilities");
const superagent = require("superagent");
const jwt = require("express-jwt");
app.use(utilities.requestLogger);
app.use(require("cors")());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  process.on("uncaughtException", function (err) {
    console.log(err);
    superagent
      .post(config.apiEndPoint + "log")
      .send({ error: err })
      .set("backend-log", "backend")
      .set("accept", "json")
      .end((err, res) => {
        console.log("Log added success.");
      });
  });
  next();
});

app.use(
  jwt({
    secret: config.secret,
    algorithms: ["HS256"],
  }).unless({ path: ["/customer","/customer/login","/log/"] }) //['/^\/customer\/.*/']
);

app.use(function (err, req, res, next) {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: err.inner.message }).end();
  }
});

const logs = require("./logs");
app.use("/log", logs);

const customer = require("./customers");
app.use("/customer", customer);

const order = require("./orders");
app.use("/order", order);

const product = require("./products");
app.use("/product", product);

module.exports = app;
