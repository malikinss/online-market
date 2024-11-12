const express = require("express");
const router = express.Router();

const checkRole = require("../../middleware/checkRoleMiddleware");
const OrderController = require("../../controllers/controllersToManageOrders/OrderController/OrderController");

// Routes for creating and receiving all orders
router
    .route("/")
    .post(OrderController.createRecord) // POST: Create a new order
    .get(checkRole("admin"), OrderController.getRecords); // GET: Get all orders (admin only)

// Routes for operations with a specific order by ID
router
    .route("/:id")
    .get(OrderController.getRecord) // GET: Get order by ID
    .put(OrderController.updateRecord) // PUT: Update order by ID
    .delete(OrderController.deleteRecord); // DELETE: Delete order by ID

// Route for receiving orders of a specific user
router.route("/user/:id").get(OrderController.getRecordsPerUser); // GET: Get orders by user ID

module.exports = router;
