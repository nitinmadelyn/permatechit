const config = require("../config/config");
const express = require("express");
const router = express.Router();
const { v4: generateId } = require("uuid");
const Order = require("../models/order");
const OrderDetail = require("../models/orderDetail");

router.post("/", async function (req, res, next) {
  const { userId, products } = req.body;

  if (typeof userId !== "string") {
    res.status(400).json({ message: "invalid `userId` expected string" });
    return;
  }
  if(!Array.isArray(products)){
    res.status(400).json({ message: "invalid `products` expected array" });
    return;
  }
  products.forEach(product => {
    if(!product.productId || !product.productName || !product.quantity || !product.status){
      res.status(400).json({ message: "invalid `products` object expected productId, productName, quantity, status" });
      return;
    }
  })

  const orderId = generateId();
  const customerData = {
    id: orderId,
    userId,
  };

  await Order.createOne(customerData);
  const productsToInsert = products.map((product) => {
    product.id = generateId();
    product.userId = userId;
    product.orderId = orderId;
    return product;
  })
  await OrderDetail.createMany(productsToInsert)
  res.status(201).json({ message: "Order created successfully." }).end();
});

router.get("/:page?", async function (req, res, next) {
  const page = parseInt(req.params.page) || 1;

  let filters = {};

  const orders = await Order.commonSearch({
    filters,
    sort: { createdAt: 1 },
    page: page,
    limit: config.itemsPerPage,
  });

  res
    .status(200)
    .json({
      items: orders.docs,
      pagination: {
        pageNumber: orders.page,
        totalPages: orders.totalPages,
      },
    })
    .end();
});

router.put("/:id", async function (req, res, next) {
  const { id } = req.params;
  const { status } = req.body;

  let fieldsToUpdate;
  if (typeof status !== "string") {
    res.status(400);
    res.json({ message: "invalid `status` expected string" });
    return;
  } else if (status != "Processing" && status != "Done") {
    res.status(400);
    res.json({ message: "invalid `status` expected Processing / Done" });
    return;
  }
  fieldsToUpdate = { status };

  await Order.customUpdate({ conditions: { id }, fields: fieldsToUpdate });

  res.status(200).json({message: "Order status updated successfully."}).end();
});

router.all("/*", function (req, res, next) {
  res.status(403).json("Forbidden").end();
});

module.exports = router;
