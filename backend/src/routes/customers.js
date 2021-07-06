const config = require("../config/config");
const express = require("express");
const router = express.Router();
const { v4: generateId } = require("uuid");
const Customer = require("../models/customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  
  if (typeof email !== "string") {
    res.status(400).json({ message: "invalid `email` expected string" });
    return;
  }
  if (typeof password !== "string") {
    res.status(400).json({ message: "invalid `password` expected string" });
    return;
  }
  const filters = {
    email,
  };
  const customer = await Customer.commonSearch({ filters });
  if (bcrypt.compareSync(password, customer[0].password)) {
    const userPayload = {
      id: customer[0].id,
    };

    var token = jwt.sign(userPayload, config.secret, { expiresIn: "24h" });
    res.status(200).json({ token }).end();
  } else {
    res.status(401).json({ message: "Authentication failed." }).end();
  }
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;

  const filters = {};
  if (typeof id !== "undefined") {
    if (typeof id !== "string") {
      res.status(400).json({ message: "invalid `id` expected string" });
      return;
    }
    filters.id = id;
  }

  const customer = await Customer.commonSearch({
    filters,
    sort: { createdAt: 1 },
  });
  res.status(200).json(customer[0]).end();
});

router.post("/", async function (req, res, next) {
  const { fullName, email, password } = req.body;

  if (typeof fullName !== "string") {
    res.status(400).json({ message: "invalid `fullName` expected string" });
    return;
  }
  //not added validation for unique email address for this demo
  if (typeof email !== "string") {
    res.status(400).json({ message: "invalid `email` expected string" });
    return;
  }
  if (typeof password !== "string") {
    res.status(400).json({ message: "invalid `password` expected string" });
    return;
  }

  var passwordHash = bcrypt.hashSync(password, 10);
  const customerData = {
    id: generateId(),
    fullName,
    email,
    password: passwordHash,
  };

  await Customer.createOne(customerData);
  delete customerData.password;
  res.status(201).json(customerData).end();
});

router.all("/*", function (req, res, next) {
  res.status(403).json("Forbidden").end();
});

module.exports = router;
