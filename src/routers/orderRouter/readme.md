# `orderRouter.js`

## Description 📝

This Express.js router module manages routes related to orders.
It provides functionality for creating, retrieving, updating, and deleting orders, with role-based access control for fetching all orders.
Additionally, it allows fetching orders specific to a user.

## Purpose 🎯

The module facilitates the management of orders in an e-commerce or order processing system.
It supports creating orders, retrieving them, updating existing orders, and deleting them.
The role-based access control ensures only "admin" users can view all orders, while any user can access their own orders.

## How It Works 🔍

-   **POST /**: Creates a new order record.
-   **GET /**: Retrieves all orders. This action is restricted to "admin" users through the `checkRole` middleware.
-   **GET /:id**: Retrieves a specific order by its ID.
-   **PUT /:id**: Updates an existing order by its ID.
-   **DELETE /:id**: Deletes an order by its ID.
-   **GET /user/:id**: Retrieves all orders for a specific user based on their ID.

## Output 📜

-   Successful requests will return the created order, the list of all orders, or the updated order.
-   Error responses will return the corresponding HTTP status code, especially when access is restricted or an order is not found.

## Usage 📦

1. Install the necessary dependencies:
    ```bash
    npm install express
    ```
2. Import and use the router in your main app file:
    ```javascript
    const orderRouter = require("./path/to/orderRouter");
    app.use("/order", orderRouter);
    ```
3. Ensure the following methods are defined in the `OrderController`:
    - `createRecord`: For creating a new order.
    - `getRecords`: For retrieving all orders.
    - `getRecord`: For retrieving an order by ID.
    - `updateRecord`: For updating an order by ID.
    - `deleteRecord`: For deleting an order by ID.
    - `getRecordsPerUser`: For retrieving orders for a specific user by their ID.
4. Implement the `checkRole` middleware to restrict access based on user roles for the `GET /` route.

## Conclusion 🚀

This router module efficiently handles the core operations related to orders in an application, providing clear API endpoints for both general order management and user-specific order retrieval.
With role-based access control, it ensures that sensitive order data is accessible only to authorized users.
