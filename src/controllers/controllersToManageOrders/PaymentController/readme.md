# PaymentController 💳

The `PaymentController` module handles payment-related operations for an Express.js application.
It facilitates CRUD operations (Create, Read, Update, Delete) on payment records associated with orders in the database.
Each operation is modularized into separate methods, enhancing code maintainability and organization.

## Files 📄

1. `PaymentController.js`
   This is the main controller file that handles all payment-related operations.
   It imports methods from the `methods` directory and organizes them into an easy-to-use interface for each CRUD operation.

    - **createRecord**: Handles the creation of a new payment.
    - **getRecord**: Retrieves a payment by its unique ID.
    - **updateRecord**: Updates the status of a payment.
    - **deleteRecord**: Deletes a payment by its ID.

2. `methods/createPayment.js`
   Defines the `createPayment` function, which creates a new payment record in the database.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: ID of the created payment.
    - **Error Handling**: Throws an `ApiError` if creation fails or if input validation fails.

3. `methods/deletePayment.js`
   Defines the `deletePayment` function to delete a payment by its unique ID.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object with a success message confirming the deletion.
    - **Error Handling**: Throws an `ApiError` if the ID is missing or if the deletion fails.

4. `methods/getPayment.js`
   Defines the `getPayment` function to retrieve a payment by its unique ID.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object containing the payment information.
    - **Error Handling**: Throws an `ApiError` if the payment is not found or if the ID is missing.

5. `methods/updatePayment.js`
   Defines the `updatePayment` function to update the status of a payment.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object of the updated payment record.
    - **Error Handling**: Throws an `ApiError` if the payment or order is not found, or if updating fails.

## Usage Guide 📝

1. **Importing the PaymentController**
   To use the `PaymentController`, import it into the desired route file in your Express application:

    ```javascript
    const PaymentController = require("path/to/PaymentController");
    ```

2. **Sample Routes**
   Here’s a basic example of how you might set up routes to use `PaymentController` methods:

    ```javascript
    const express = require("express");
    const router = express.Router();
    const PaymentController = require("path/to/PaymentController");

    // Route to create a new payment
    router.post("/payments", PaymentController.createRecord);

    // Route to get a specific payment by ID
    router.get("/payments/:id", PaymentController.getRecord);

    // Route to update payment status by ID
    router.put("/payments/:id", PaymentController.updateRecord);

    // Route to delete a payment by ID
    router.delete("/payments/:id", PaymentController.deleteRecord);

    module.exports = router;
    ```

3. **Error Handling**
   Each method in `PaymentController` employs consistent error handling using `ApiError`, which ensures that meaningful error messages are returned in case of invalid inputs or internal issues.

## Dependencies 🛠️

-   `Express`: Used for request handling in each method.
-   `ApiError`: Custom error-handling module to throw specific errors during CRUD operations.
-   `controllerUtils`: Utility functions for validations and messages.
-   `Payment`: Sequelize model for interacting with the payments table in the database.

## Conclusion 🚀

The `PaymentController` module simplifies the management of payment records in your application by organizing CRUD operations in a clean, modular way.
It leverages custom error handling to ensure smooth and reliable interactions with the payment data in the database.
