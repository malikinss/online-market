const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController/userController");

// User registration route
router.post("/register", userController.registration);

// User logging in route
router.post("/login", userController.login);

// Get user by specific id route
router.get("/:id", authMiddleware, userController.getCurrentUser);

// User password changing route
router.put("/change-password", authMiddleware, userController.changePassword);

// User information updating route
router.put("/update", authMiddleware, userController.updateUserInfo);

// User deletion route
router.delete("/delete", authMiddleware, userController.deleteUser);

module.exports = router;
