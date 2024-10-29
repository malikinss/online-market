const express = require("express");
const router = express.Router();

const OrderItemController = require("../controllers/orderItemController");

router
    .route("/:id")
    .post(OrderItemController.create)
    .get(OrderItemController.getAllOrderItems);

router
    .route("/:id")
    .get(OrderItemController.getOrderItemById)
    .put(OrderItemController.updateById)
    .delete(OrderItemController.deleteById);

module.exports = router;
