const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentController");

router.post("/", PaymentController.create);

router
    .route("/:id")
    .get(PaymentController.getById)
    .put(PaymentController.updateById)
    .delete(PaymentController.deleteById);

module.exports = router;
