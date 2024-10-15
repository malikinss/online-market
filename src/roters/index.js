const Router = require("express");
const router = new Router();
const itemRouter = require('./itemRouter');
const categorieRouter = require('./categorieRouter');
// const userRouter = require('./userRouter');


router.use("/categorie", categorieRouter);
router.use("/item", itemRouter);
// router.use("/user", userRouter);

module.exports = router;
