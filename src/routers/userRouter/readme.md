# `userRouter.js`

## Description 📝

This Express.js router module handles routes for user registration, login, and management.
It provides functionality for user authentication, updating user data, and changing passwords, while ensuring secure access with authentication middleware.

## Purpose 🎯

The purpose of this module is to expose API endpoints for user-related operations, including creating a new user, logging in, retrieving, updating, and deleting user data, as well as changing passwords.
Authentication middleware ensures that sensitive user data can only be accessed by authorized users.

## How It Works 🔍

-   **POST /register**: Registers a new user by creating a user record.
-   **POST /login**: Authenticates a user and returns a login token.
-   **GET /:id**: Retrieves the user information by ID, accessible only to authenticated users.
-   **PUT /update/:id**: Updates the user information by ID, accessible only to authenticated users.
-   **DELETE /delete/:id**: Deletes a user record by ID, accessible only to authenticated users.
-   **PUT /change-password/:id**: Allows the user to change their password, accessible only to authenticated users.

## Output 📜

-   **POST /register**: Returns the newly created user record.
-   **POST /login**: Returns a JWT token for the user upon successful login.
-   **GET /:id**: Returns the user data for the specified ID.
-   **PUT /update/:id**: Returns the updated user data.
-   **DELETE /delete/:id**: Returns a success message indicating the user has been deleted.
-   **PUT /change-password/:id**: Returns a success message confirming the password has been changed.

## Usage 📦

1. Install the necessary dependencies:
    ```bash
    npm install express
    ```
2. Import and use the router in your main app file:
    ```javascript
    const userRouter = require("./path/to/userRouter");
    app.use("/user", userRouter);
    ```
3. Ensure that the following methods are defined in the `UserController`:
    - `createRecord`: For registering a new user.
    - `logIn`: For authenticating a user and issuing a token.
    - `getRecord`: For retrieving user information by ID.
    - `updateRecord`: For updating user data by ID.
    - `deleteRecord`: For deleting a user record by ID.
    - `changePassword`: For allowing the user to change their password.
4. Implement the `authMiddleware` to protect routes that require authentication, such as `GET /:id`, `PUT /update/:id`, `DELETE /delete/:id`, and `PUT /change-password/:id`.

## Conclusion 🚀

This router module provides essential endpoints for managing user accounts and ensuring secure access to user-related data.
It covers registration, authentication, updating, and password management, making it a crucial component for any application requiring user authentication and management.
