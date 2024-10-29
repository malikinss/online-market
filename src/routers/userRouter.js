const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.route("/").post(userController.registration).get(userController.login);

router
    .route("/:id")
    .get(userController.getCurrentUser)
    .put(userController.changePassword)
    .delete(userController.deleteUser);

module.exports = router;
