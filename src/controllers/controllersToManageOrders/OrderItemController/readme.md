# OrderItemController 📂

The `OrderItemController` module handles CRUD operations for managing order items in an e-commerce application.
It provides organized methods for creating, reading, updating, and deleting order items in the database.
These operations help keep track of product quantities and associated data for each order.

## Files 📄

1. **`OrderItemController.js`**
   This is the main controller file for managing order items. It imports the methods from the `methods` directory and provides a structured interface for each CRUD operation.

    - **createRecord**: Handles the creation of a new order item.
    - **getRecord**: Retrieves a specific order item by its ID.
    - **getRecords**: Retrieves all order items associated with a specific order.
    - **updateRecord**: Updates the quantity of an existing order item.
    - **deleteRecord**: Deletes an order item by its ID.

2. **`methods/createOrderItem.js`**
   Defines the `createOrderItem` function to create a new order item in the database.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object of the created order item.
    - **Error Handling**: Throws an `ApiError` if the product or order does not exist or creation fails.

3. **`methods/deleteOrderItem.js`**
   Defines the `deleteOrderItem` function to delete an order item by its ID.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object with a success message.
    - **Error Handling**: Throws an `ApiError` if the `orderItemId` is missing, not found, or an error occurs during deletion.

4. **`methods/getOrderItem.js`**
   Defines the `getOrderItem` function to retrieve a specific order item by its ID.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object with the found order item.
    - **Error Handling**: Throws an `ApiError` if the order item is not found or if an internal error occurs.

5. **`methods/updateOrderItem.js`**
   Defines the `updateOrderItem` function to update the quantity of an order item by its ID.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object of the updated order item.
    - **Error Handling**: Throws an `ApiError` if the `orderItemId` or `newQuantity` is missing, not found, or if updating fails.

6. **`methods/getOrderItems.js`**
   Defines the `getOrderItems` function to retrieve all order items associated with a specific `orderId`.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON array of all order items for the specified order.
    - **Error Handling**: Throws an `ApiError` if no order items are found or if an error occurs during retrieval.

## Usage Guide 📝

1. **Importing the OrderItemController**
   To use the `OrderItemController`, import it into the desired route file in your Express application:

    ```javascript
    const OrderItemController = require("path/to/OrderItemController");
    ```

2. **Sample Routes**
   Here’s a basic example of how you might set up routes to use `OrderItemController` methods:

    ```javascript
    const express = require("express");
    const router = express.Router();
    const OrderItemController = require("path/to/OrderItemController");

    // Route to create a new order item
    router.post("/order-items", OrderItemController.createRecord);

    // Route to get a specific order item by ID
    router.get("/order-items/:id", OrderItemController.getRecord);

    // Route to update an order item's quantity
    router.put("/order-items/:id", OrderItemController.updateRecord);

    // Route to delete an order item by ID
    router.delete("/order-items/:id", OrderItemController.deleteRecord);

    // Route to get all order items by order ID
    router.get("/orders/:orderId/order-items", OrderItemController.getRecords);

    module.exports = router;
    ```

3. **Error Handling**
   Each method in `OrderItemController` employs consistent error handling using `ApiError`, ensuring that meaningful error messages are returned in case of invalid inputs or internal issues.

## Dependencies 🛠️

-   `Express`: Used for handling HTTP requests in each method.
-   `ApiError`: Custom error-handling module to throw specific errors during CRUD operations.
-   `OrderItem`: Sequelize model for interacting with the order items table in the database.

## Conclusion 🚀

The `OrderItemController` module organizes and simplifies managing order items in an application.
By encapsulating CRUD operations for order items in separate methods, it ensures a modular and maintainable structure while providing robust error handling and reliable database interactions.
