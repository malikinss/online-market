const Router = require("express");
const router = new Router();
const itemController = require("../controllers/itemController");
const checkRole = require("../middleware/checkRoleMiddleware");

// http://127.0.0.1:3000/api/item
router
  .route("/")
  .post(checkRole("admin"), itemController.create) // POST Create item
  .get(itemController.getAll); // GET all items

router
  .route("/:id")
  .get(itemController.getOne) // GET item by id
  .put(checkRole("admin"), itemController.updateById) // PUT item by id
  .delete(checkRole("admin"), itemController.deleteById); // DELETE item by id

module.exports = router;
