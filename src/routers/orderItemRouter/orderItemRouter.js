const express = require("express");
const router = express.Router();

const OrderItemController = require("../../controllers/controllersToManageOrders/OrderItemController/OrderItemController");

// Routes for creating and retrieving order items
router
    .route("/")
    .post(OrderItemController.createRecord) // POST: Create an order item record
    .get(OrderItemController.getRecords); // GET: Get all order item records

// Routes for specific order item operations by ID
router
    .route("/:id")
    .get(OrderItemController.getRecord) // GET: Get order item by ID
    .put(OrderItemController.updateRecord) // PUT: Update order item by ID
    .delete(OrderItemController.deleteRecord); // DELETE: Delete an order item by ID

module.exports = router;
