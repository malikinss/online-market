const express = require("express");
const router = express.Router();

const OrderItemController = require("../controllers/OrderItemController/OrderItemController");

router
  .route("/")
  .post(OrderItemController.createRecord)
  .get(OrderItemController.getRecords);

router
  .route("/:id")
  .get(OrderItemController.getRecord)
  .put(OrderItemController.updateRecord)
  .delete(OrderItemController.deleteRecord);

module.exports = router;
