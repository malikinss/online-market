# UserAddressController 📂

The `UserAddressController` module is responsible for managing user address-related operations in the database.
It provides a set of methods for creating, retrieving, updating, and deleting user address records.
Each operation is defined in separate files within the `methods` directory for modularity and ease of maintenance.

## Files 📄

1. `UserAddressController.js`
   This is the main controller file for handling all user address-related operations. It imports the methods from the `methods` directory and provides an organized interface for each CRUD operation.

    - **createRecord**: Handles the creation of a new user address.
    - **getRecord**: Retrieves a specific user address.
    - **updateRecord**: Updates an existing user address by ID.
    - **deleteRecord**: Deletes a user address by ID.

2. `methods/createAddress.js`
   Defines the `createAddress` function to create a new user address in the database.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object of the newly created address.
    - **Error Handling**: Throws an `ApiError` if address data is invalid or creation fails.

3. `methods/deleteAddress.js`
   Defines the `deleteAddress` function to delete a user address by its ID.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: Success message in JSON format.
    - **Error Handling**: Throws an `ApiError` if the `addressId` is invalid or deletion fails.

4. `methods/getAddress.js`
   Defines the `getAddress` function to retrieve a specific user address by its ID.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object of the requested address.
    - **Error Handling**: Throws an `ApiError` if address ID is missing or not found.

5. `methods/updateAddress.js`
   Defines the `updateAddress` function to update a user address by ID.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object of the updated address.
    - **Error Handling**: Throws an `ApiError` if the address ID or data is missing or update fails.

## Usage Guide 📝

1. **Importing the UserAddressController**
   To use the `UserAddressController`, import it into the desired route file in your Express application:

    ```javascript
    const UserAddressController = require("path/to/UserAddressController");
    ```

2. **Sample Routes**
   Here’s a basic example of how you might set up routes to use `UserAddressController` methods:

    ```javascript
    const express = require("express");
    const router = express.Router();
    const UserAddressController = require("path/to/UserAddressController");

    // Route to create a new address
    router.post("/addresses", UserAddressController.createRecord);

    // Route to get a specific address
    router.get("/addresses/:id", UserAddressController.getRecord);

    // Route to update an address
    router.put("/addresses/:id", UserAddressController.updateRecord);

    // Route to delete an address
    router.delete("/addresses/:id", UserAddressController.deleteRecord);

    module.exports = router;
    ```

3. **Error Handling**
   Each method in `UserAddressController` uses consistent error handling with `ApiError`, ensuring that meaningful error messages are returned if there are invalid inputs or issues with the database.

## Dependencies 🛠️

-   `Express`: Framework for handling HTTP requests.
-   `ApiError`: Custom error-handling module to throw specific errors during CRUD operations.
-   `UserAddress`: Sequelize model for interacting with the user addresses table in the database.

## Conclusion 🚀

The `UserAddressController` module simplifies managing user address data through a clear and modular structure.
It ensures efficient and reliable database interactions, with proper validation and error handling in place, providing a robust solution for user address management in the application.
