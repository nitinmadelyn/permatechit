const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    id: String,
    userId: String,
    status: { type: String, default: "Done" },
  },
  { timestamps: true, versionKey: false }
);
orderSchema.plugin(mongoosePaginate);

const Order = (module.exports = mongoose.model("Order", orderSchema));

module.exports.createOne = async function (params) {
  return await Order.create([params]);
};

module.exports.customUpdate = async function (params) {
  return await Order.updateOne(params.conditions, params.fields);
};

module.exports.commonSearch = async function (params) {
  let options = {};
  let conditions = {};
  if (params.filters) {
    conditions = params.filters;
  }
  if (params.sort) {
    options.sort = params.sort;
  }
  if (params.page) {
    options.page = params.page;
  }
  if (params.limit) {
    options.limit = params.limit;
  }

  return await Order.paginate(conditions, options);
};
