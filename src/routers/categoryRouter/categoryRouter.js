const express = require("express");
const router = express.Router();

const checkRole = require("../../middleware/checkRoleMiddleware");
const CategoryController = require("../../controllers/CategoryController/CategoryController");

// Creating and getting categories
router
    .route("/")
    .post(checkRole("admin"), CategoryController.createRecord) // Create category (admin only)
    .get(CategoryController.getRecords); // Get all categories

// Updating and deleting a category by ID
router
    .route("/:id")
    .put(checkRole("admin"), CategoryController.updateRecord) // Category update (admin only)
    .delete(checkRole("admin"), CategoryController.deleteRecord); // Delete category (admin only)

module.exports = router;
