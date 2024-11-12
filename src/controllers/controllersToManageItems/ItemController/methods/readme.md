# ItemController Methods 📂

## Description 📝

This directory contains various methods to manage Item records in the database.  
These methods enable CRUD operations (Create, Read, Update, Delete) on items, providing an efficient way to interact with item data through a RESTful API in an Express.js application.

## Purpose 🎯

The purpose of these methods is to facilitate operations on Item data.  
These include:

-   Creating a new item
-   Retrieving all items
-   Retrieving a specific item by ID
-   Updating an existing item's data
-   Deleting an item by ID

## Methods Overview 🔍

`createItem.js` - Creates a new item record in the database.  
`deleteItem.js` - Deletes an item record by its ID.  
`getItem.js` - Retrieves a specific item by its ID.  
`getItems.js` - Retrieves all item records from the database.  
`updateItem.js` - Updates an existing item by ID.

## Method Details

### 1. `createItem.js`

-   **Functionality**: Creates a new item.
-   **Parameters**:
    -   `req`: Express request object; expects `name`, `description`, `price`, `stock`, `categoryId`, and `imgFile` in `req.body` or `req.files`.
    -   `res`: Express response object to send the newly created item as JSON.
    -   `next`: Express middleware function for error handling.
-   **Usage**: This method validates the provided data, processes the image file, and saves the item to the database.
-   **Returns**: A newly created item as JSON.
-   **Error Handling**: Throws `ApiError` if any required data is missing or invalid.

### 2. `deleteItem.js`

-   **Functionality**: Deletes an item by its ID.
-   **Parameters**:
    -   `req`: Express request object; expects `id` in `req.params`.
    -   `res`: Express response object to send a success message after deletion.
    -   `next`: Express middleware function for error handling.
-   **Usage**: Finds the item by ID and deletes it from the database.
-   **Returns**: A success message in JSON format.
-   **Error Handling**: Throws `ApiError` if the item is not found or if the deletion fails.

### 3. `getItem.js`

-   **Functionality**: Retrieves an item based on the provided ID from the request parameters.
-   **Parameters**:
    -   `req`: Express request object; expects `id` in `req.params`.
    -   `res`: Express response object to send the found item as JSON.
    -   `next`: Express middleware function for error handling.
-   **Usage**: Fetches the item from the database based on the provided ID.
-   **Returns**: The found item as JSON.
-   **Error Handling**: Throws `ApiError` if the item is not found or if fetching fails.

### 4. `getItems.js`

-   **Functionality**: Retrieves all items from the database.
-   **Parameters**:
    -   `req`: Express request object.
    -   `res`: Express response object to send the found items as JSON.
    -   `next`: Express middleware function for error handling.
-   **Usage**: Fetches all items from the database.
-   **Returns**: A list of all items as JSON.
-   **Error Handling**: Throws `ApiError` if no items are found or if fetching fails.

### 5. `updateItem.js`

-   **Functionality**: Updates an existing item based on the provided ID and new data.
-   **Parameters**:
    -   `req`: Express request object; expects `id` in `req.params` and `name`, `description`, `price`, `stock`, `categoryId` in `req.body`.
    -   `res`: Express response object to send the updated item as JSON.
    -   `next`: Express middleware function for error handling.
-   **Usage**: Finds the item by ID and updates its details with the new data provided in the request.
-   **Returns**: The updated item as JSON.
-   **Error Handling**: Throws `ApiError` if the item is not found or if the data is invalid.

## Usage 📦

1. **Create a New Item**:

    - Endpoint: `POST /items`
    - Body: `{ "name": "Item Name", "description": "Item Description", "price": 100, "stock": 50, "categoryId": "categoryId", "imgFile": "imageFile" }`

2. **Delete an Item by ID**:

    - Endpoint: `DELETE /items/:id`
    - Params: `id` (ID of the item to delete)

3. **Retrieve All Items**:

    - Endpoint: `GET /items`

4. **Retrieve an Item by ID**:

    - Endpoint: `GET /items/:id`
    - Params: `id` (ID of the item to retrieve)

5. **Update an Item by ID**:

    - Endpoint: `PUT /items/:id`
    - Params: `id` (ID of the item to update)
    - Body: `{ "name": "Updated Item Name", "description": "Updated Item Description", "price": 120, "stock": 30, "categoryId": "updatedCategoryId" }`

## Conclusion 🚀

The `ItemController` methods provide a straightforward and efficient way to manage items in the database.
These methods handle common CRUD operations, enabling seamless interaction with the database.  
By integrating these methods into your Express.js application, you can easily manage items, handle errors effectively, and ensure the data is properly validated before performing any operations.
These methods can be extended or modified as needed, depending on the specific requirements of your project.
They offer a solid foundation for building a RESTful API for managing items.
