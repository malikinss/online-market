# CategoryController 📂

The `CategoryController` module handles CRUD operations for category management in the database.
It organizes functionality into specific methods for creating, reading, updating, and deleting categories.
Each method is encapsulated in a separate file within the `methods` directory for maintainability and modularity.

## Files 📄

1. `CategoryController.js`
   This is the main controller file for handling all category-related operations.
   It imports the methods from the `methods` directory and provides an organized interface for each CRUD operation.

-   **createRecord**: Handles the creation of a new category.
-   **getRecords**: Retrieves all category records.
-   **updateRecord**: Updates an existing category's name.
-   **deleteRecord**: Deletes a category by its ID.

2. `methods/createCategory.js`
   Defines the `createCategory` function to create a new category in the database.

-   **Parameters**: Accepts the `req`, `res`, and `next` middleware functions from Express.
-   **Returns**: JSON object of the created category.
-   **Error Handling**: Throws an `ApiError` if creation fails or if input validation fails.

3. `methods/deleteCategory.js`
   Defines the `deleteCategory` function to delete a category by its ID.

-   **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
-   **Returns**: JSON object with a success message.
-   **Error Handling**: Throws an `ApiError` if the category ID is not provided or if deletion fails.

4. `methods/getCategories.js`
   Defines the `getCategories` function to retrieve all categories from the database.

-   **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
-   **Returns**: JSON array of category objects.
-   **Error Handling**: Throws an `ApiError` if categories are not found or if an internal error occurs.

5. `methods/updateCategory.js`
   Defines the `updateCategory` function to update a category's name by ID.

-   **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
-   **Returns**: JSON object of the updated category.
-   **Error Handling**: Throws an `ApiError` if the ID or new name is not provided, or if updating fails.

## Usage Guide 📝

1. **Importing the CategoryController**
   To use the `CategoryController`, import it into the desired route file in your Express application:

    ```javascript
    const CategoryController = require("path/to/CategoryController");
    ```

2. **Sample Routes**
   Here’s a basic example of how you might set up routes to use `CategoryController` methods:

    ````javascript
    const express = require("express");
    const router = express.Router();
    const CategoryController = require("path/to/CategoryController");

    // Route to create a new category
    router.post("/category", CategoryController.createRecord);

    // Route to get all categories
    router.get("/categories", CategoryController.getRecords);

    // Route to update a category
    router.put("/category/:id", CategoryController.updateRecord);

    // Route to delete a category
    router.delete("/category/:id", CategoryController.deleteRecord);

    module.exports = router;```
    ````

3. **Error Handling**
   Each method in `CategoryController` employs consistent error handling using `ApiError`, which ensures that meaningful error messages are returned in case of invalid inputs or internal issues.

## Dependencies 🛠️

-   `Express`: Used for request handling in each method.
-   `ApiError`: Custom error-handling module to throw specific errors during CRUD operations.
-   `controllerUtils`: Utility functions for validations and messages.
-   `Category`: Sequelize model for interacting with the categories table in the database.

## Conclusion 🚀

The `CategoryController` module streamlines category management in the application by organizing CRUD operations in a clear, modular structure.
It leverages utility functions and custom error handling to ensure efficient and reliable database interactions.
