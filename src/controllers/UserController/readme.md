# UserController 📂

The `UserController` module is responsible for managing user-related operations, including CRUD functionality for user accounts.
It facilitates user registration, login, profile updates, password changes, and deletion.
The controller integrates various methods that are organized within the `methods` directory to ensure maintainability and modularity.

## Files 📄

1. `UserController.js`
   The main controller file that provides an interface for user-related operations such as creating, retrieving, updating, deleting user records, handling user login, and changing passwords.

    - **createRecord**: Handles user registration and returns a JWT token upon successful creation.
    - **getRecord**: Retrieves information about a specific user.
    - **updateRecord**: Updates user information such as email, phone number, or address.
    - **deleteRecord**: Deletes a user by their ID.
    - **logIn**: Manages user login and generates a JWT token for authenticated users.
    - **changePassword**: Allows a user to change their password.

2. `methods/registerUser.js`
   Defines the `registerUser` function, which handles user registration, ensuring email and phone uniqueness, and returns a JWT token.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object with the JWT token.
    - **Error Handling**: Throws an `ApiError` if validation fails or if a server error occurs.

3. `methods/getUser.js`
   Defines the `getUser` function, which retrieves the current user's information.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object containing user information and associated address details.
    - **Error Handling**: Throws an `ApiError` if the user or address is not found or if an error occurs.

4. `methods/logInUserHandler.js`
   Defines the `logInUserHandler` function, which logs in a user by verifying credentials and generating a JWT token.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object containing the JWT token.
    - **Error Handling**: Throws an `ApiError` if login credentials are incorrect or if a general error occurs.

5. `methods/passwordChanger.js`
   Defines the `passwordChanger` function, which allows users to change their passwords.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object with a success message.
    - **Error Handling**: Throws an `ApiError` if the current password is incorrect, the user is not found, or an error occurs during the update.

6. `methods/deleteUser.js`
   Defines the `deleteUser` function, which deletes a user by their ID.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object with a success message.
    - **Error Handling**: Throws an `ApiError` if the user ID is missing, not found, or if deletion fails.

7. `methods/updateUser.js`
   Defines the `updateUser` function, which updates user information, including email, phone, and address.

    - **Parameters**: Accepts `req`, `res`, and `next` middleware functions from Express.
    - **Returns**: JSON object containing updated user information.
    - **Error Handling**: Throws an `ApiError` if the user is not found or if there’s a general error during the update.

## Usage Guide 📝

1. **Importing the UserController**
   To use the `UserController`, import it into the desired route file in your Express application:

    ```javascript
    const UserController = require("path/to/UserController");
    ```

2. **Sample Routes**
   Here’s a basic example of how you might set up routes to use `UserController` methods:

    ```javascript
    const express = require("express");
    const router = express.Router();
    const UserController = require("path/to/UserController");

    // Route to register a new user
    router.post("/users/register", UserController.createRecord);

    // Route to log in a user
    router.post("/users/login", UserController.logIn);

    // Route to get current user information
    router.get("/users/me", UserController.getRecord);

    // Route to update user information
    router.put("/users/me", UserController.updateRecord);

    // Route to change user password
    router.put("/users/change-password", UserController.changePassword);

    // Route to delete a user
    router.delete("/users/me", UserController.deleteRecord);

    module.exports = router;
    ```

3. **Error Handling**
   Each method in `UserController` employs consistent error handling using `ApiError`, ensuring that meaningful error messages are returned in case of invalid inputs or internal issues.

## Dependencies 🛠️

-   `Express`: Used for request handling in each method.
-   `ApiError`: Custom error-handling module to throw specific errors during CRUD operations and other user actions.
-   `controllerUtils`: Utility functions for validations and error messages.
-   `User`: Sequelize model for interacting with the users table in the database.

## Conclusion 🚀

The `UserController` module provides a structured way to manage user-related data, covering key functionalities such as registration, login, profile updates, password changes, and deletion.
It ensures secure and efficient management of user accounts through organized methods and error handling, contributing to a reliable user experience in your Express application.
