const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController/OrderController");

router
  .route("/")
  .post(OrderController.createRecord)
  .get(OrderController.getRecords);

router
  .route("/:id")
  .get(OrderController.getRecord)
  .put(OrderController.updateRecord)
  .delete(OrderController.deleteRecord);

router.route("user/:id").get(OrderController.getRecordsPerUser);

module.exports = router;
