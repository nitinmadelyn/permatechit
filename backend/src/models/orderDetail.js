const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const orderDetailSchema = new Schema(
  {
    id: String,
    userId: String,
    orderId: String,
    productId: String,
    productName: String,
    quantity: Number,
    status: { type: String, default: "Done" },
  },
  { timestamps: true, versionKey: false }
);
orderDetailSchema.plugin(mongoosePaginate);

const OrderDetail = (module.exports = mongoose.model("OrderDetail", orderDetailSchema));

module.exports.createMany = async function (params) {
  return await OrderDetail.insertMany(params);
};

module.exports.customUpdate = async function (params) {
  return await OrderDetail.updateOne(params.conditions, params.fields);
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

  return await OrderDetail.paginate(conditions, options);
};
