# UserController Methods 📂

## Description 📝

This directory contains various methods to manage User records in the database.
These methods enable CRUD operations (Create, Read, Update, Delete) and additional functionalities for user accounts, including registration, login, password management, and deletion, providing a complete solution for handling user-related data in an Express.js application.

## Purpose 🎯

The purpose of these methods is to facilitate operations on User data, including account creation, retrieval, authentication, and management of user-specific settings.

## Methods 🔍

1. `deleteUser.js`

    - **Functionality**: Deletes a user by their ID, along with their associated address.
    - **Parameters**:
        - `req`: Express request object; expects `id` from the token.
        - `res`: Express response object to send the response.
        - `next`: Express middleware function for error handling.
    - **Returns**: JSON object with a success message.
    - **Exceptions**: Throws `ApiError` if the user ID is missing, not found, or if a general error occurs during deletion.

2. `getUser.js`

    - **Functionality**: Retrieves the current user's information along with their address.
    - **Parameters**:
        - `req`: Express request object; expects user ID from the token.
        - `res`: Express response object to send user information.
        - `next`: Express middleware function for error handling.
    - **Returns**: JSON object containing user and address details.
    - **Exceptions**: Throws `ApiError` if the user or address is not found or if an error occurs while fetching data.

3. `logInUserHandler.js`

    - **Functionality**: Logs in a user by verifying credentials and generating a JWT token.
    - **Parameters**:
        - `req`: Express request object; expects `email` and `password` in `req.body`.
        - `res`: Express response object to send back the JWT token.
        - `next`: Express middleware function for error handling.
    - **Returns**: JSON object containing the JWT token.
    - **Exceptions**: Throws `ApiError` if login credentials are incorrect or if a general error occurs.

4. `passwordChanger.js`

    - **Functionality**: Changes the password of an authenticated user.
    - **Parameters**:
        - `req`: Express request object; expects `oldPassword` and `newPassword` in `req.body` also expects user ID from the token.
        - `res`: Express response object to send the response.
        - `next`: Express middleware function for error handling.
    - **Returns**: JSON object with a success message.
    - **Exceptions**: Throws `ApiError` if the current password is incorrect, the user is not found, or if a general error occurs during the update.

5. `registerUser.js`

    - **Functionality**: Registers a new user, ensuring email and phone uniqueness, and returns a JWT token upon successful registration.
    - **Parameters**:
        - `req`: Express request object containing user details in `req.body`.
        - `res`: Express response object to send the response.
        - `next`: Express middleware function for error handling.
    - **Returns**: JSON object containing the JWT token.
    - **Exceptions**: Throws `ApiError` if validation fails or if a server error occurs.

6. `updateUser.js`

    - **Functionality**: Updates user information, allowing modifications to fields such as `email`, `phone` and address info.
    - **Parameters**:
        - `req`: Express request object containing updated user data in `req.body`.
        - `res`: Express response object to send the response.
        - `next`: Express middleware function for error handling.
    - **Returns**: JSON object with updated user information.
    - **Exceptions**: Throws `ApiError` if the user is not found or if there’s a general error during the update.

## Usage 📦

1. **Register a New User**:

    - Endpoint: `POST /users/register`
    - Body: `{ "firstName": "John", "lastName": "Doe", "email": "john@example.com", "password": "password123", "phone": "1234567890", "role": "user" }`

2. **Login a User**:

    - Endpoint: `POST /users/login`
    - Body: `{ "email": "john@example.com", "password": "password123" }`

3. **Retrieve Current User Information**:

    - Endpoint: `GET /users/me`
    - Headers: `Authorization: Bearer <token>`

4. **Delete a User**:

    - Endpoint: `DELETE /users/me`
    - Headers: `Authorization: Bearer <token>`

5. **Change Password**:

    - Endpoint: `PUT /users/change-password`
    - Body: `{ "oldPassword": "password123", "newPassword": "newPassword456" }`
    - Headers: `Authorization: Bearer <token>`

6. **Update User Information**:
    - Endpoint: `PUT /users/me`
    - Body: `{ "firstName": "John", "lastName": "Doe", "phone": "1234567890" }`
    - Headers: `Authorization: Bearer <token>`

## Conclusion 🚀

These methods provide a comprehensive way to manage `User` records in the database, covering core aspects of user account creation, retrieval, login, password management, updating, and deletion.
This setup ensures a secure and efficient experience when handling user data.
