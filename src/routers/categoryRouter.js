const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");
const categoryController = require("../controllers/categoryController/categoryController");

router
  .route("/")
  .post(checkRole("admin"), categoryController.create)
  .get(categoryController.getAll);

router
  .route("/:id")
  .put(checkRole("admin"), categoryController.update)
  .delete(checkRole("admin"), categoryController.delete);

module.exports = router;
