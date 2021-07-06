const express = require("express");
const router = express.Router();
const { v4: generateId } = require("uuid");
const Log = require("../models/log");

router.post("/", async function (req, res, next) {
  const log = req.body;
  const logging = {
    id: generateId(),
    body: JSON.stringify(log),
  };
  if(req.header('backend-log')){
    logging.source = req.header('backend-log');
  }
  
  await Log.createOne(logging)
  res.status(201).end();
});

router.all("/*", function (req, res, next) {
  res.status(204).end();
});

module.exports = router;
