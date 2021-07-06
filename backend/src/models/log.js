const mongoose = require("mongoose");
const { Schema } = mongoose;

const logSchema = new Schema(
  {
    id: String,
    source: { type: String, default: "frontend" },
    body: String,
  },
  { timestamps: true }
);

const Log = (module.exports = mongoose.model("Log", logSchema));

const createOne = async function (params) {
  return await Log.create([params]);
};

module.exports = {
  createOne,
};
