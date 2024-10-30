const express = require("express");
const router = express.Router();
const UserAddressController = require("../controllers/userAddressController/userAdressController");

// Маршрут для создания нового адреса
router.post("/create", UserAddressController.createRecord);

router
    .route("/:id")
    .get(UserAddressController.getRecord)
    .put(UserAddressController.updateRecord)
    .delete(UserAddressController.deleteRecord);

module.exports = router;
