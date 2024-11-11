# PaymentController Methods 📦

## Description 📝

This directory contains methods for managing `Payment` records in the database.
These methods handle CRUD operations (Create, Read, Update, Delete) on payments associated with orders in an Express.js application, ensuring the effective management of payment data.

## Purpose 🎯

The primary goal of these methods is to facilitate the handling of payments for orders, including creating new payments, updating their statuses, and retrieving or deleting payment records as needed.

## Method Details 🔍

1. **`createPayment.js`**

-   **Functionality**: Creates a new payment record.
-   **Parameters**:
    -   `req`: Express request object.
    -   `res`: Express response object to send back the payment ID.
    -   `next`: Middleware function for error handling.
-   **Returns**: The `id` of the created payment.
-   **Exceptions**: Throws an `ApiError` if the payment creation fails.

2. **`deletePayment.js`**

-   **Functionality**: Deletes a payment by its unique ID.
-   **Parameters**:
    -   `req`: Express request object; expects `paymentId` in `res.locals`;
    -   `res`: Express response object to send a success message.
    -   `next`: Middleware function for error handling.
-   **Returns**: JSON object confirming the payment deletion.
-   **Exceptions**: Throws an `ApiError` if the ID is missing or the deletion fails.

3. **`getPayment.js`**

-   **Functionality**: Retrieves a payment by its unique ID.
-   **Parameters**:
    -   `req`: Express request object; expects `paymentId` in `req.params`.
    -   `res`: Express response object to send the retrieved payment in JSON format.
    -   `next`: Middleware function for error handling.
-   **Returns**: JSON object containing the retrieved payment information.
-   **Exceptions**: Throws an `ApiError` if the payment is not found or the ID is missing.

4. **`updatePayment.js`**

-   **Functionality**: Updates the status of a payment and associated order by their respective IDs.
-   **Parameters**:
    -   `req`: Express request object; expects `paymentId` of the payment in `req.params`.
    -   `res`: Express response object to send the updated payment record.
    -   `next`: Middleware function for error handling.
-   **Returns**: JSON object with the updated payment information.
-   **Exceptions**: Throws an `ApiError` if the payment or order is not found, or if updating the payment fails.

## Usage 📦

1. **Create a new payment**:

    - Endpoint: `POST /payments`
    - No additional parameters are required in the request.

2. **Delete a payment by ID**:

    - Endpoint: `DELETE /payments/:id`
    - Parameters: `paymentId` (ID of the payment to delete)

3. **Get a payment by ID**:

    - Endpoint: `GET /payments/:id`
    - Parameters: `paymentId` (ID of the payment to retrieve)

4. **Update a payment status by ID**:

    - Endpoint: `PUT /payments/:id`
    - Parameters: `paymentId` (ID of the payment to update)

## Conclusion 🚀

These methods offer an efficient approach to managing `Payment` records, covering all aspects of creating, reading, updating, and deleting payments.
Robust error handling ensures reliability when interacting with the data through the API.
