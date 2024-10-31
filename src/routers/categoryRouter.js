const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController/categoryController");

router
    .route("/")
    .post(categoryController.create)
    .get(categoryController.getAll);

router
    .route("/:id")
    .put(categoryController.update)
    .delete(categoryController.delete);

module.exports = router;
