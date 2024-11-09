# `categoryRouter.js`

## Description 📝

This Express.js router module handles routes related to managing categories.
It provides functionality for creating, retrieving, updating, and deleting categories, with role-based access control for administrative actions.

## Purpose 🎯

The module is designed to manage categories through RESTful API endpoints.
It restricts certain actions, such as creating, updating, and deleting categories, to users with an "admin" role using the `checkRole` middleware.

## How It Works 🔍

-   **POST /**: Creates a new category. This route is protected by the `checkRole` middleware, which ensures that only users with the "admin" role can access it.
-   **GET /**: Retrieves all categories.
-   **PUT /:id**: Updates an existing category by its ID. This route is also protected by the `checkRole` middleware, allowing only "admin" users to update categories.
-   **DELETE /:id**: Deletes a category by its ID. Like the other modifying routes, it is restricted to "admin" users.

## Output 📜

-   Successful requests will return the created category data, all categories, or the updated category data.
-   Error responses will return an appropriate HTTP status code and error message, particularly for unauthorized access.

## Usage 📦

1. Install the necessary dependencies:
    ```bash
    npm install express
    ```
2. Import and use the router in your main app file:
    ```javascript
    const categoryRouter = require("./path/to/categoryRouter");
    app.use("/category", categoryRouter);
    ```
3. Ensure that the `CategoryController` has the following methods defined:
    - `createRecord`: For creating a new category.
    - `getRecords`: For retrieving all categories.
    - `updateRecord`: For updating a category by ID.
    - `deleteRecord`: For deleting a category by ID.
4. Ensure that the `checkRole` middleware is implemented to restrict access based on user roles.

## Conclusion 🚀

This router provides a clean and secure way to manage categories, ensuring that only authorized users can modify categories while allowing all users to view them.
The role-based access control enhances security and restricts sensitive actions to administrators.
