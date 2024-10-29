const Router = require("express");
const router = new Router();

const addressRouter = require("./addressRouter");
const userRouter = require("./userRouter");

const orderRouter = require("./orderRouter");
const paymentRouter = require("./paymentRouter");
const orderItemRouter = require("./orderItemRouter");

const categoryRouter = require("./categoryRouter");
const itemRouter = require("./itemRouter");

router.use("/address", addressRouter);
router.use("/user", userRouter);

router.use("/order", orderRouter);
router.use("/payment", paymentRouter);
router.use("/orderItem", orderItemRouter);

router.use("/category", categoryRouter);
router.use("/item", itemRouter);

module.exports = router;
