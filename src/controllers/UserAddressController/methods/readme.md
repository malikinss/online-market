# AddressController Methods 📂

## Description 📝

This directory contains various methods to manage user address records in the database.
These methods enable CRUD operations (Create, Read, Update, Delete) on user addresses, providing an efficient way to interact with address data through an API in an Express.js application.

## Purpose 🎯

The purpose of these methods is to facilitate operations on user address data.

## Methods 🔍

1. `createAddress.js`

-   Functionality: Creates a new user address.
-   Parameters:
    -   `req`: Express request object; expects address data in `req.body.address`.
    -   `res`: Express response object to store the newly created address in `res.locals.address`.
    -   `next`: Express middleware function for error handling.
-   Returns: None; the function either sends a response or calls the next middleware.
-   Exceptions: Throws an `ApiError` if the address data is invalid or if the creation fails.

2. `deleteAddress.js`

-   Functionality: Deletes a user address by its ID.
-   Parameters:
    -   `req`: Express request object; expects `addressId` in `req.params.id`.
    -   `res`: Express response object to send the success message.
    -   `next`: Express middleware function for error handling.
-   Returns: None; sends a success message or calls the next middleware.
-   Exceptions: Throws an `ApiError` if the `addressId` is invalid, the address is not found, or deletion fails.

3. `getAddress.js`

-   Functionality: Retrieves a user address by its ID.
-   Parameters:
    -   `req`: Express request object. expects `addressId` in `res.locals.id`.
    -   `res`: Express response object to store the retrieved address in `res.locals.address`.
    -   `next`: Express middleware function for error handling.
-   Returns: JSON object of the requested address.
-   Exceptions: Throws an `ApiError` if the address ID is missing or the address is not found.

4. `updateAddress.js`

-   Functionality: Updates an existing user address by its ID.
-   Parameters:
    -   `req`: Express request object; expects `addressId` in `res.locals.id` and address data in `req.body.address`.
    -   `res`: Express response object to send the updated address.
    -   `next`: Express middleware function for error handling.
-   Returns: JSON object of the updated address.
-   Exceptions: Throws an `ApiError` if the `addressId` or address data is missing, or if the update fails.

## Usage 📦

1. **Create a New Address**:

    - Endpoint: `POST /addresses`
    - Body: `{ "address": { "country": "USA", "city": "New York", "street": "5th Ave", "building": 123, "apartment": 45, "postal": 10001 } }`

2. **Delete an Address by ID**:

    - Endpoint: `DELETE /addresses/:id`
    - Params: `id` (ID of the address to delete)

3. **Retrieve an Address by ID**:

    - Endpoint: `GET /addresses/:id`
    - Params: `id` (ID of the address to fetch)

4. **Update an Address by ID**:

    - Endpoint: `PUT /addresses/:id`
    - Params: `id` (ID of the address to update)
    - Body: `{ "address": { "country": "USA", "city": "New York", "street": "5th Ave", "building": 123, "apartment": 45, "postal": 10001 } }`

## Conclusion 🚀

These methods provide a comprehensive way to manage user address records in the database.
Following the CRUD principles, this setup allows efficient handling of address data, with proper error handling and response messaging to ensure a reliable and user-friendly API experience.
