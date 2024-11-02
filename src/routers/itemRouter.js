const Router = require("express");
const router = new Router();
const ItemController = require("../controllers/itemController/itemController");
const checkRole = require("../middleware/checkRoleMiddleware");

// http://127.0.0.1:3000/api/item
router
    .route("/")
    .post(checkRole("admin"), ItemController.createRecord) // POST Create item
    .get(ItemController.getAllRecords); // GET all items

router
    .route("/:id")
    .get(ItemController.getRecord) // GET item by id
    .put(checkRole("admin"), ItemController.updateRecord) // PUT item by id
    .delete(checkRole("admin"), ItemController.deleteRecord); // DELETE item by id

module.exports = router;
