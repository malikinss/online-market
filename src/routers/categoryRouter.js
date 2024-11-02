const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");
const categoryController = require("../controllers/categoryController/categoryController");

router
    .route("/")
    .post(checkRole("admin"), categoryController.createRecord)
    .get(categoryController.getRecords);

router
    .route("/:id")
    .put(checkRole("admin"), categoryController.updateRecord)
    .delete(checkRole("admin"), categoryController.deleteRecord);

module.exports = router;
