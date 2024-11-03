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
    .get(OrderController.getRecordsPerUser) // fix here
    .put(OrderController.updateRecord)
    .delete(OrderController.deleteRecord);

module.exports = router;
