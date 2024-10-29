const express = require("express");
const router = express.Router();
const UserAddressController = require("../controllers/userAddressController");

// Маршрут для создания нового адреса
router.post("/create", UserAddressController.create);

router
    .route("/:id")
    .get(UserAddressController.getAddress)
    .put(UserAddressController.updateById)
    .delete(UserAddressController.deleteById);

module.exports = router;
