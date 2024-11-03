const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");
const CategoryController = require("../controllers/CategoryController/CategoryController");

router
    .route("/")
    .post(checkRole("admin"), CategoryController.createRecord)
    .get(CategoryController.getRecords);

router
    .route("/:id")
    .put(checkRole("admin"), CategoryController.updateRecord)
    .delete(checkRole("admin"), CategoryController.deleteRecord);

module.exports = router;
