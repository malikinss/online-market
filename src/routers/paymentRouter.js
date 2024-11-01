const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentController/paymentController");

router.post("/", PaymentController.createRecord);

router
    .route("/:id")
    .get(PaymentController.getRecord)
    .put(PaymentController.updateRecord)
    .delete(PaymentController.deleteRecord);

module.exports = router;
