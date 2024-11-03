const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const UserController = require("../controllers/UserController/UserController");

// Basic CRUD routes
// User registration route
router.post("/register", UserController.createRecord);

// Get user by specific id route
router.get("/:id", authMiddleware, UserController.getRecord);

// User information updating route
router.put("/update/:id", authMiddleware, UserController.updateRecord);

// User deletion route
router.delete("/delete/:id", authMiddleware, UserController.deleteRecord);

// Additional routes
// User logging in route
router.post("/login", UserController.logIn);

// User password changing route
router.put(
    "/change-password/:id",
    authMiddleware,
    UserController.changePassword
);

module.exports = router;
