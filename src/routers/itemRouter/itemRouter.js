const express = require("express");
const router = express.Router();

const ItemController = require("../../controllers/controllersToManageItems/ItemController/ItemController");
const checkRole = require("../../middleware/checkRoleMiddleware");

// Route for creating and retrieving items
router
    .route("/")
    .post(checkRole("admin"), ItemController.createRecord) // POST: Create item (admin only)
    .get(ItemController.getRecords); // GET: Get all items

// Route for handling individual items by ID
router
    .route("/:id")
    .get(ItemController.getRecord) // GET: Get item by ID
    .put(checkRole("admin"), ItemController.updateRecord) // PUT: Update item by ID (admin only)
    .delete(checkRole("admin"), ItemController.deleteRecord); // DELETE: Delete item by ID (admin only)

module.exports = router;
