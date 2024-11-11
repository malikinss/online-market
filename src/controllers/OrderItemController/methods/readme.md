# OrderItemController Methods 📂

## Description 📝

This directory contains various methods to manage OrderItem records in the database.
These methods enable CRUD operations (Create, Read, Update, Delete) on order items, providing an efficient way to interact with order items data through a API in an Express.js application.

## Purpose 🎯

The purpose of these methods is to facilitate operations on OrderItem data.

## Methods

1. `createOrderItem.js`

-   Functionality: Creates a new order item.
-   Parameters:
    -   `req`: Express request object.
    -   `res`: Express response object to send the response; expects `itemId`, `quantity` in `res.locals.orderItemReq` and `orderId` in `res.locals.orderId`.
    -   `next`: Express middleware function for error handling.
-   Returns: JSON object of the newly created category.
-   Exceptions: Throws an `ApiError` if the creation fails or if input validation fails.

2. `deleteOrderItem.js`

-   Functionality: Deletes an order item by its ID.
-   Parameters:
    -   `req`: Express request object.
    -   `res`: Express response object to send the success message; expects `orderItemId` in `res.locals.orderItemId`
    -   `next`: Express middleware function for error handling.
-   Returns: JSON object with a success message.
-   Exceptions: Throws `ApiError` if the ID is not provided or if the order item is not found.

3. `getOrderItem.js`

-   Functionality: Retrieves order item record by its ID.
-   Parameters:
    -   req: Express request object; expects `orderItemId` in `req.params.id`
    -   res: Express response object to send retrieved record.
    -   next: Express middleware function for error handling.
-   Returns: JSON array of all categories.
-   Exceptions: Throws `ApiError` if order item isn't found or if there is an error in fetching data.

4. `getOrderItems.js`

-   Functionality: Retrieves all order items records for specified order.
-   Parameters:
    -   req: Express request objectexpects `orderId` in `req.body`.
    -   res: Express response object to send the array of order items.
    -   next: Express middleware function for error handling.
-   Returns: JSON array of all categories.
-   Exceptions: Throws `ApiError` if no order items are found or if there is an error in fetching data.

5. `updateOrderItem.js`

-   Functionality: Updates the quantity of an existing order item by its ID.
-   Parameters:
    -   req: Express request object; expects `orderItemId` in `req.params.id` and `newQuantity` in `req.body.quantity`.
    -   res: Express response object to send the updated orderItem.
    -   next: Express middleware function for error handling.
-   Returns: JSON object of the updated category.
-   Exceptions: Throws `ApiError` if the ID or new name is not provided, if the orderItem is not found, or if the update fails.

## Usage 📦

1. **Create a New Category**:

    - Endpoint: `POST /categories`
    - Body: `{ "name": "New Category" }`

2. **Delete a Category by ID**:

    - Endpoint: `DELETE /categories/:id`
    - Params: `id` (ID of the category to delete)

3. **Retrieve All Categories**:

    - Endpoint: `GET /categories`

4. **Update a Category's Name by ID**:

    - Endpoint: `PUT /categories/:id`
    - Params: `id` (ID of the category to update)
    - Body: `{ "newName": "Updated Category Name" }`

## Conclusion 🚀

These methods provide a robust way to manage `Category` records in the database.
By following the CRUD principles, this setup allows for a streamlined experience when handling category data.
Proper error handling and response messaging are implemented for reliable and user-friendly API interactions.
