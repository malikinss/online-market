const express = require("express");
const router = express.Router();

const PaymentController = require("../../controllers/controllersToManageOrders/PaymentController/PaymentController");

// POST: Create a new payment record
router.post("/", PaymentController.createRecord);

// GET, PUT, DELETE: Operations with a specific payment record by ID
router
    .route("/:id")
    .get(PaymentController.getRecord) // GET: Get payment information by ID
    .put(PaymentController.updateRecord) // PUT: Update payment record by ID
    .delete(PaymentController.deleteRecord); // DELETE: Удаление платежной записи по ID

module.exports = router;
