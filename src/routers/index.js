const express = require("express");
const router = express.Router();

// Import routes for users and addresses
const addressRouter = require("./addressRouter");
const userRouter = require("./userRouter");

// Import routes for orders and payments
const orderRouter = require("./orderRouter");
const paymentRouter = require("./paymentRouter");
const orderItemRouter = require("./orderItemRouter");

// Import routes for categories and products
const categoryRouter = require("./categoryRouter");
const itemRouter = require("./itemRouter");

// User and address routes
router.use("/address", addressRouter);
router.use("/user", userRouter);

// Order and payment routes
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);
router.use("/orderItem", orderItemRouter);

// Category and item routes
router.use("/category", categoryRouter);
router.use("/item", itemRouter);

module.exports = router;
