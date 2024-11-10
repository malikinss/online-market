# ItemController 📂

The `ItemController` module handles CRUD operations for item management in the database.  
It organizes functionality into specific methods for creating, reading, updating, and deleting items.  
Each method is encapsulated in a separate file within the `methods` directory for maintainability and modularity.

## Files 📄

1. `ItemController.js`  
   This is the main controller file for handling all item-related operations.  
   It imports the methods from the `methods` directory and provides an organized interface for each CRUD operation.

-   **createRecord**: Handles the creation of a new item.
-   **getRecords**: Retrieves all item records.
-   **getRecord**: Retrieves a specific item by its ID.
-   **updateRecord**: Updates an existing item by its ID.
-   **deleteRecord**: Deletes an item by its ID.

2. `methods/createItem.js`  
   Defines the `createItem` function to create a new item in the database.

-   **Parameters**: Accepts the `req`, `res`, and `next` middleware functions from Express.
-   **Returns**: JSON object of the created item.
-   **Error Handling**: Throws an `ApiError` if creation fails or if input validation fails.

3. `methods/deleteItem.js`  
   Defines the `deleteItem` function to delete an item by its ID.

-   **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
-   **Returns**: JSON object with a success message.
-   **Error Handling**: Throws an `ApiError` if the item ID is not provided or if deletion fails.

4. `methods/getItem.js`  
   Defines the `getItem` function to retrieve a specific item by its ID.

-   **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
-   **Returns**: JSON object of the found item.
-   **Error Handling**: Throws an `ApiError` if the item is not found or if fetching fails.

5. `methods/getItems.js`  
   Defines the `getItems` function to retrieve all items from the database.

-   **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
-   **Returns**: JSON array of item objects.
-   **Error Handling**: Throws an `ApiError` if no items are found or if an internal error occurs.

6. `methods/updateItem.js`  
   Defines the `updateItem` function to update an item by its ID.

-   **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
-   **Returns**: JSON object of the updated item.
-   **Error Handling**: Throws an `ApiError` if the item ID or new data is not provided, or if updating fails.

## Usage Guide 📝

1. **Importing the ItemController**  
   To use the `ItemController`, import it into the desired route file in your Express application:

    ```javascript
    const ItemController = require("path/to/ItemController");
    ```

2. **Sample Routes**
   Here’s a basic example of how you might set up routes to use ItemController methods:

    ```javascript
    const express = require("express");
    const router = express.Router();
    const ItemController = require("path/to/ItemController");

    // Route to create a new item
    router.post("/items", ItemController.createRecord);

    // Route to get all items
    router.get("/items", ItemController.getRecords);

    // Route to get an item by ID
    router.get("/items/:id", ItemController.getRecord);

    // Route to update an item
    router.put("/items/:id", ItemController.updateRecord);

    // Route to delete an item
    router.delete("/items/:id", ItemController.deleteRecord);

    module.exports = router;
    ```

3. **Error Handling**
   Each method in ItemController employs consistent error handling using ApiError, ensuring meaningful error messages are returned in case of invalid inputs or internal issues.

## Dependencies 🛠️

-   `Express`: Used for request handling in each method.
-   `ApiError`: Custom error-handling module to throw specific errors during CRUD operations.
-   `controllerUtils`: Utility functions for validations and messages.
-   `Item`: Sequelize model for interacting with the items table in the database.

## Conclusion 🚀

The `ItemController` module streamlines item management in the application by organizing CRUD operations in a clear, modular structure.
It leverages utility functions and custom error handling to ensure efficient and reliable database interactions.
