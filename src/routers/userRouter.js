const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

// Регистрация пользователя
router.post("/register", userController.registration);

// Вход пользователя
router.post("/login", userController.login);

// Получение текущего пользователя по ID
router.get("/:id", authMiddleware, userController.getCurrentUser);

// Изменение пароля
router.put("/change-password", authMiddleware, userController.changePassword);

// Обновление информации о пользователе
router.put("/update", authMiddleware, userController.updateUserInfo);

// Удаление пользователя
router.delete("/delete", authMiddleware, userController.deleteUser);

module.exports = router;
