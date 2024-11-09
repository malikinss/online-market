# `addressRouter.js`

## Description 📝

This is an Express.js router module that handles routes for managing user addresses.
It defines endpoints for creating, retrieving, updating, and deleting user address records.

## Purpose 🎯

The purpose of this module is to provide RESTful API routes for interacting with user addresses.
It uses the `UserAddressController` to handle business logic for address management.

## How It Works 🔍

-   **POST /create**: Creates a new address by calling the `createRecord` method in the `UserAddressController`.
-   **GET /:id**: Retrieves an address by its ID using the `getRecord` method in the `UserAddressController`.
-   **PUT /:id**: Updates an address by its ID through the `updateRecord` method in the `UserAddressController`.
-   **DELETE /:id**: Deletes an address by its ID by invoking the `deleteRecord` method in the `UserAddressController`.

## Output 📜

-   Successful requests will result in the appropriate address data being returned or updated.
-   Error responses will return a suitable HTTP status code and error message.

## Usage 📦

1. Install the necessary dependencies:
    ```bash
    npm install express
    ```
2. Import the router into your main app file:
    ```javascript
    const addressRouter = require("./path/to/addressRouter");
    app.use("/address", addressRouter);
    ```
3. Ensure that the `UserAddressController` has the following methods defined:
    - `createRecord`: For creating a new address.
    - `getRecord`: For retrieving an address by ID.
    - `updateRecord`: For updating an address by ID.
    - `deleteRecord`: For deleting an address by ID.

## Conclusion 🚀

This router module is a simple, organized way to manage user address data through RESTful API routes.
It abstracts the controller logic for creating, retrieving, updating, and deleting address records, allowing for scalable and maintainable code.
