const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/authHandling/auth/authMiddleware");
const UserController = require("../../controllers/controllersToManageUsers/UserController/UserController");

// Register a new user
router.post("/register", UserController.createRecord);

// User authorization
router.post("/login", UserController.logIn);

// Getting user information by ID
router.get("/:id", authMiddleware, UserController.getRecord);

// Update user information by ID
router.put("/update/:id", authMiddleware, UserController.updateRecord);

// Delete user by ID
router.delete("/delete/:id", authMiddleware, UserController.deleteRecord);

// Change user password
router.put(
    "/change-password/:id",
    authMiddleware,
    UserController.changePassword
);

module.exports = router;
