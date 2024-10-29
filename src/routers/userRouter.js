const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.post("/register", userController.registration);
router.post("/login", userController.login);

router.get("/current", authMiddleware, userController.getCurrentUser);

router.put("/change-password", authMiddleware, userController.changePassword);
router.put("/update", authMiddleware, userController.updateUserInfo);

router.delete("/delete", authMiddleware, userController.deleteUser);

module.exports = router;
