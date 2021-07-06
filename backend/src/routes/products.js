const config = require("../config/config");
const express = require("express");
const router = express.Router();
const OrderDetail = require("../models/orderDetail");

router.get("/:page?", async function (req, res, next) {
  const page = parseInt(req.params.page) || 1;

  let filters = {};

  const products = await OrderDetail.commonSearch({
    filters,
    sort: { createdAt: -1 },
    page: page,
    limit: config.itemsPerPage,
  });

  res
    .status(200)
    .json({
      items: products.docs,
      pagination: {
        pageNumber: products.page,
        totalPages: products.totalPages,
      },
    })
    .end();
});

router.put("/:id", async function (req, res, next) {
  const { id } = req.params;
  const { status, quantity } = req.body;

  let fieldsToUpdate;
  if (typeof status !== "undefined") {
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
  }

  if (typeof quantity !== "undefined") {
    if (typeof quantity !== "number") {
      res.status(400);
      res.json({ message: "invalid `quantity` expected number" });
      return;
    }
    fieldsToUpdate = { quantity };
  }

  await OrderDetail.customUpdate({
    conditions: { id },
    fields: fieldsToUpdate,
  });

  res
    .status(200)
    .json({ message: "Product status updated successfully." })
    .end();
});

router.all("/*", function (req, res, next) {
  res.status(403).json("Forbidden").end();
});

module.exports = router;
