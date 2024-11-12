# OrderController 📂

The `OrderController` module manages CRUD operations for order processing in the application database.
It includes methods for creating, reading, updating, and deleting orders.
Each method is encapsulated in individual files within the `methods` directory to maintain clear modularity and easy maintenance.

## Files 📄

1. `OrderController.js`  
   This main controller file orchestrates all operations related to order management. It imports various methods from the `methods` directory, each handling a specific CRUD operation.

-   **createRecord**: Initiates the creation of a new order.
-   **getRecord**: Retrieves a single order by ID.
-   **getRecords**: Retrieves all orders in the database.
-   **getRecordsPerUser**: Retrieves all orders for a specified user.
-   **updateRecord**: Updates an order’s details.
-   **deleteRecord**: Deletes an order by its ID.

2. `methods/createOrder.js`  
   Contains the `createOrder` function, which creates a new order, including order items and payment information.

-   **Parameters**: Accepts the `req`, `res`, and `next` middleware functions from Express, expecting `userId`, `items`, and `paymentInfo` in `req.body`.
-   **Returns**: JSON object of the created order.
-   **Error Handling**: Throws an `ApiError` if input validation or creation fails.

3. `methods/getOrder.js`  
   Defines the `getOrder` function to fetch an order by its ID, including related items and payment information.

-   **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express, expecting `id` in `req.params`.
-   **Returns**: JSON object with the order details.
-   **Error Handling**: Throws an `ApiError` if the order is not found.

4. `methods/getOrders.js`  
   Defines the `getOrders` function to retrieve all orders from the database.

-   **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
-   **Returns**: JSON array of orders.
-   **Error Handling**: Throws an `ApiError` if there’s an error fetching data or if no orders are found.

5. `methods/getOrdersPerUser.js`  
   Defines the `getOrdersPerUser` function to fetch all orders associated with a specific user.

-   **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express, expecting `userId` in `req.params`.
-   **Returns**: JSON array of orders for the specified user.
-   **Error Handling**: Throws an `ApiError` if no orders are found for the user.

6. `methods/updateOrder.js`  
   Contains the `updateOrder` function, updating an existing order’s details, including items and payment data.

-   **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express, expecting `id` in `req.params` and updated order data in `req.body`.
-   **Returns**: JSON object of the updated order.
-   **Error Handling**: Throws an `ApiError` if necessary data is missing or if the update fails.

7. `methods/deleteOrder.js`  
   Defines the `deleteOrder` function, which deletes an order by its ID.

-   **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express, expecting `id` in `req.params`.
-   **Returns**: JSON object confirming deletion.
-   **Error Handling**: Throws an `ApiError` if the order ID is not provided or if the order is not found.

## Usage Guide 📝

1. **Importing the OrderController**  
   To use `OrderController`, import it into the required route file in your Express application:

    ```javascript
    const OrderController = require("path/to/OrderController");
    ```

2. **Sample Routes**  
   Example setup for routes utilizing `OrderController` methods:

    ```javascript
    const express = require("express");
    const router = express.Router();
    const OrderController = require("path/to/OrderController");

    // Route to create a new order
    router.post("/orders", OrderController.createRecord);

    // Route to retrieve an order by ID
    router.get("/orders/:id", OrderController.getRecord);

    // Route to retrieve all orders
    router.get("/orders", OrderController.getRecords);

    // Route to retrieve orders for a specific user
    router.get("/user/:userId/orders", OrderController.getRecordsPerUser);

    // Route to update an order by ID
    router.put("/orders/:id", OrderController.updateRecord);

    // Route to delete an order by ID
    router.delete("/orders/:id", OrderController.deleteRecord);

    module.exports = router;
    ```

3. **Error Handling**  
   Each method in `OrderController` leverages consistent error handling through `ApiError`, ensuring meaningful error messages and handling of invalid inputs or system issues.

## Dependencies 🛠️

-   `Express`: For request handling in each method.
-   `ApiError`: Custom error module to manage specific errors during CRUD operations.
-   `controllerUtils`: Utility functions for validations and messages.
-   `Order`: Sequelize model for managing the `orders` table in the database.

## Conclusion 🚀

The `OrderController` module simplifies order management in the application by organizing CRUD operations within a well-defined, modular structure. It uses utility functions and custom error handling to ensure reliable interactions with the database.
