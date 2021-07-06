const mongoose = require("mongoose");
const config = require("./config");
const database = module.exports;

database.connect = async function connect() {
  database.client = await mongoose.connect(config.dbConnectString, {
    useUnifiedTopology: true,
    useNewUrlParse: true
  });
};
