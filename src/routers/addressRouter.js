const express = require("express");
const router = express.Router();
const UserAddressController = require("../controllers/UserAddressController/UserAddressController");

// Create a new address
router.post("/create", UserAddressController.createRecord);

// Getting, updating and deleting an address by ID
router
    .route("/:id")
    .get(UserAddressController.getRecord) // Getting address by ID
    .put(UserAddressController.updateRecord) // Updating address by ID
    .delete(UserAddressController.deleteRecord); // Delete address by ID

module.exports = router;
