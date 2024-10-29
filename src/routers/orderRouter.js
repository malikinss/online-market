const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router
    .route("/")
    .post(orderController.create)
    .get(orderController.getAllUserOrders);

router
    .route("/:id")
    .get(orderController.getOrderById)
    .put(orderController.updateById)
    .delete(orderController.deleteById);

module.exports = router;
