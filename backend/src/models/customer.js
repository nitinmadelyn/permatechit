const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    id: String,
    fullName: String,
    email: String,
    password: String,
    status: { type: String, default: "active" },
  },
  { timestamps: true, versionKey: false }
);
customerSchema.plugin(mongoosePaginate);

const Customer = (module.exports = mongoose.model("Customer", customerSchema));

module.exports.createOne = async function (params) {
  return await Customer.create([params]);
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

  const customer = await Customer.paginate(conditions, options);
  return customer.docs;
};
