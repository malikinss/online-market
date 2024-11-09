# `itemRouter.js`

## Description 📝

This Express.js router module provides routes for managing items.
It allows for creating, retrieving, updating, and deleting items, with role-based access control (RBAC) for modifying items, ensuring only users with an "admin" role can perform certain actions.

## Purpose 🎯

The purpose of this module is to expose RESTful API endpoints for handling items in a system.
It provides functionalities such as creating, retrieving, updating, and deleting items, with access restrictions for modifying data based on the user's role.

## How It Works 🔍

-   **POST /**: Creates a new item. This action is restricted to users with the "admin" role via the `checkRole` middleware.
-   **GET /**: Retrieves a list of all items.
-   **GET /:id**: Retrieves an individual item by its ID.
-   **PUT /:id**: Updates an item by its ID. This action is restricted to "admin" users.
-   **DELETE /:id**: Deletes an item by its ID. Only "admin" users are allowed to perform this action.

## Output 📜

-   Successful requests will return the created item, the list of items, or the updated item.
-   Error responses will return the corresponding HTTP status code along with an error message, especially for unauthorized actions.

## Usage 📦

1. Install the necessary dependencies:
    ```bash
    npm install express
    ```
2. Import and use the router in your main app file:
    ```javascript
    const itemRouter = require("./path/to/itemRouter");
    app.use("/item", itemRouter);
    ```
3. Ensure the following methods are defined in the `ItemController`:
    - `createRecord`: For creating a new item.
    - `getAllRecords`: For retrieving all items.
    - `getRecord`: For retrieving an item by ID.
    - `updateRecord`: For updating an item by ID.
    - `deleteRecord`: For deleting an item by ID.
4. Implement the `checkRole` middleware to restrict actions based on user roles.

## Conclusion 🚀

This router provides a secure and effective way to manage items in the system, with strong role-based access control.
Only authorized users can modify items, while all users have access to view item data.
The clean separation of functionality and authorization ensures both security and usability.
