# OrderController Methods 📂

## Description 📝

This directory contains various methods to manage orders in the system.
These methods provide the functionality to handle operations like creating, retrieving, deleting, updating orders, order items, and payments in a RESTful manner within an Express.js application.

## Purpose 🎯

The purpose of these methods is to manage orders and related data in the system. The operations include:

-   Creating new orders
-   Retrieving order details
-   Deleting orders
-   Updating orders
-   Retrieving all orders for a specific user

## Methods Overview 🔍

-   `createOrder.js` - Creates a new order record.
-   `getOrder.js` - Retrieves a specific order by its ID.
-   `getOrders.js` - Retrieves all orders.
-   `getOrdersPerUser.js` - Retrieves all orders for a specific user.
-   `deleteOrder.js` - Deletes an order by its ID.
-   `updateOrder.js` - Updates an existing order by its ID.

## Method Details

### 1. `createOrder.js`

-   **Functionality**: Creates a new order, including order items and payment records.
-   **Parameters**:
    -   `req`: Express request object; expects `userId`, `items`, and `paymentInfo` in `req.body`.
    -   `res`: Express response object to send the newly created order.
    -   `next`: Express middleware function for error handling.
-   **Returns**: JSON object of the newly created order.
-   **Exceptions**: Throws an `ApiError` if the order creation fails or if input validation fails.

### 2. `getOrder.js`

-   **Functionality**: Retrieves a single order by its ID, including associated order items and payment details.
-   **Parameters**:
    -   `req`: Express request object; expects `id` in `req.params`.
    -   `res`: Express response object to send the order details.
    -   `next`: Express middleware function for error handling.
-   **Returns**: JSON object containing the order, items, and payment details.
-   **Exceptions**: Throws an `ApiError` if the order is not found.

### 3. `getOrders.js`

-   **Functionality**: Retrieves all orders from the database.
-   **Parameters**:
    -   `req`: Express request object.
    -   `res`: Express response object to send the list of orders.
    -   `next`: Express middleware function for error handling.
-   **Returns**: JSON array of all orders.
-   **Exceptions**: Throws an `ApiError` if no orders are found or if there is an error fetching the data.

### 4. `getOrdersPerUser.js`

-   **Functionality**: Retrieves all orders associated with a specific user ID.
-   **Parameters**:
    -   `req`: Express request object; expects `userId` in `req.params`.
    -   `res`: Express response object to send the list of orders for the user.
    -   `next`: Express middleware function for error handling.
-   **Returns**: JSON array of orders for the specified user.
-   **Exceptions**: Throws an `ApiError` if no orders are found for the user or if there is an error fetching the data.

### 5. `deleteOrder.js`

-   **Functionality**: Deletes an order by its ID.
-   **Parameters**:
    -   `req`: Express request object; expects `id` in `req.params`.
    -   `res`: Express response object to send a success message.
    -   `next`: Express middleware function for error handling.
-   **Returns**: JSON object with a success message indicating the deletion status.
-   **Exceptions**: Throws an `ApiError` if the order ID is not provided or if the order is not found.

### 6. `updateOrder.js`

-   **Functionality**: Updates an existing order by its ID, including order items and payment details.
-   **Parameters**:
    -   `req`: Express request object; expects `id` in `req.params` and updated order data (e.g., `items`, `paymentInfo`) in `req.body`.
    -   `res`: Express response object to send the updated order details.
    -   `next`: Express middleware function for error handling.
-   **Returns**: JSON object of the updated order.
-   **Exceptions**: Throws an `ApiError` if the order ID or updated data is missing, if the order is not found, or if the update fails.

## Usage 📦

1. **Create a New Order**:

    - Endpoint: `POST /orders`
    - Body: `{ "userId": "12345", "items": [{ "productId": "abc", "quantity": 2 }], "paymentInfo": { "method": "credit card", "amount": 50 } }`

2. **Retrieve an Order by ID**:

    - Endpoint: `GET /orders/:id`
    - Params: `id` (ID of the order)

3. **Retrieve All Orders**:

    - Endpoint: `GET /orders`

4. **Retrieve Orders for a Specific User**:

    - Endpoint: `GET /orders/user/:userId`
    - Params: `userId` (ID of the user)

5. **Delete an Order by ID**:

    - Endpoint: `DELETE /orders/:id`
    - Params: `id` (ID of the order)

6. **Update an Order by ID**:

    - Endpoint: `PUT /orders/:id`
    - Params: `id` (ID of the order)
    - Body: `{ "items": [{ "productId": "xyz", "quantity": 3 }], "paymentInfo": { "method": "debit card", "amount": 60 } }`

## Conclusion 🚀

These methods provide a comprehensive way to manage orders and related data in the system.
With well-defined functionality for creating, retrieving, updating, and deleting orders, these methods help ensure smooth and reliable handling of order-related operations.
Proper error handling is implemented to provide clear feedback for users and developers.
