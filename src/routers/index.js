const Router = require("express");
const router = new Router();
const itemRouter = require('./itemRouter');
const categoryRouter = require('./categoryRouter');
// const userRouter = require('./userRouter');


router.use("/category", categoryRouter);
router.use("/item", itemRouter);
// router.use("/user", userRouter);

module.exports = router;
