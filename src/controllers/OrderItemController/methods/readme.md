# OrderItemController Methods 📦

## Description 📝

This directory contains methods for managing `OrderItem` records in the database.
The methods implement CRUD operations (Create, Read, Update, Delete) for order items, enabling efficient interaction with order data in an Express.js application.

## Purpose 🎯

The main purpose of these methods is to manage `OrderItem` records associated with orders and products, ensuring up-to-date information on the price and quantity of each order item.

## Methods 🔍

1. **`createOrderItem.js`**

-   **Functionality**: Creates a new order item.
-   **Parameters**:
    -   `req`: Express request object; expects `itemId` and `quantity` in `res.locals.orderItemReq` and `orderId` in `res.locals`.
    -   `res`: Express response object to send the result.
    -   `next`: Middleware function for error handling.
-   **Returns**: JSON object with the created order item's information.
-   **Exceptions**: Throws an `ApiError` if the order or product record is not found or if creating the order item fails.

2. **`deleteOrderItem.js`**

-   **Functionality**: Deletes an order item by its ID.
-   **Parameters**:
    -   `req`: Express request object; expects `orderItemId` in `res.locals`.
    -   `res`: Express response object to send a success message.
    -   `next`: Middleware function for error handling.
-   **Returns**: JSON object with a success message.
-   **Exceptions**: Throws an `ApiError` if `orderItemId` is missing, the order item is not found, or an error occurs during deletion.

3. **`getOrderItem.js`**

-   **Functionality**: Retrieves an order item by its unique ID.
-   **Parameters**:
    -   `req`: Express request object; expects `orderItemId` in `res.locals`.
    -   `res`: Express response object to send the found order item.
    -   `next`: Middleware function for error handling.
-   **Returns**: JSON object with the found order item's information.
-   **Exceptions**: Throws an `ApiError` if the order item is not found or an error occurs during retrieval.

4. **`updateOrderItem.js`**

-   **Functionality**: Updates the quantity of an order item by its ID.
-   **Parameters**:
    -   `req`: Express request object; expects `orderItemId` of the order item in `req.params` and `newQuantity` in `req.body`.
    -   `res`: Express response object to send the updated order item.
    -   `next`: Middleware function for error handling.
-   **Returns**: JSON object with the updated order item's information.
-   **Exceptions**: Throws an `ApiError` if `orderItemId` or `newQuantity` is missing, the order item is not found, or an error occurs during updating.

5. **`getOrderItems.js`**

-   **Functionality**: Retrieves all order items for a specified `orderId`.
-   **Parameters**:
    -   `req`: Express request object; expects `orderId` in `res.locals`.
    -   `res`: Express response object to send an array of order items.
    -   `next`: Middleware function for error handling.
-   **Returns**: JSON array of all order items for the specified order.
-   **Exceptions**: Throws an `ApiError` if order items are not found or an error occurs during retrieval.

## Usage 📦

1. **Create a new order item**:

    - Endpoint: `POST /order-items`
    - Body parameters: `{ "itemId": "Product ID", "quantity": "Quantity" }`

2. **Delete an order item by ID**:

    - Endpoint: `DELETE /order-items/:id`
    - Parameters: `id` (ID of the order item to delete)

3. **Get an order item by ID**:

    - Endpoint: `GET /order-items/:id`
    - Parameters: `id` (ID of the order item to retrieve)

4. **Update the quantity of an order item by ID**:

    - Endpoint: `PUT /order-items/:id`
    - Parameters: `id` (ID of the order item to update)
    - Body parameters: `{ "quantity": "New quantity" }`

5. **Get all order items by order ID**:

    - Endpoint: `GET /orders/:orderId/order-items`
    - Parameters: `orderId` (ID of the order to retrieve items for)

## Conclusion 🚀

These methods provide an efficient way to manage `OrderItem` records and keep order data up to date.
With robust error handling and CRUD operations, these methods ensure reliable interaction with data via the API.
