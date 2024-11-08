# Payment Model 💳

## Description 📝

The `Payment` model defines the schema for payment records within the system using Sequelize.
This model includes fields for tracking the unique ID and the payment status, allowing the system to identify whether a payment is completed or pending.

## Purpose 🎯

The purpose of the `Payment` model is to represent the status of transactions within the application.
It tracks each payment's unique ID and current status, indicating if the payment has been processed (completed) or is still pending.

## How It Works 🔍

1. **Database Setup**: Connects to the configured Sequelize instance in `dbConnect`.
2. **Field Definitions**:
    - `id`: Primary key, auto-incremented integer, uniquely identifying each payment.
    - `status`: Boolean representing the payment's status, where `true` indicates a completed payment and `false` indicates a pending one.
      It defaults to `false` to denote unprocessed payments.
3. **Additional Settings**:
    - **Table Name**: Explicitly set to `"payments"` to match database conventions.
    - **Timestamps**: Enabled to track `createdAt` and `updatedAt` fields for each payment record.

## Fields 📜

-   **id**: Auto-incremented integer, primary key.
-   **status**: Boolean indicating payment status (`true` for completed, `false` for pending), with a default value of `false`.

## Usage 📦

1. **Import Model**:
    ```javascript
    const Payment = require("./models/Payments/Payments");
    ```
2. **Create a Payment Record**:
    ```javascript
    Payment.create({ status: false })
        .then((payment) => console.log("Payment created:", payment))
        .catch((error) => console.error("Failed to create payment:", error));
    ```
3. **Update Payment Status**:
    ```javascript
    Payment.update({ status: true }, { where: { id: 1 } })
        .then(() => console.log("Payment status updated"))
        .catch((error) =>
            console.error("Failed to update payment status:", error)
        );
    ```
4. **Retrieve All Payments**:
    ```javascript
    Payment.findAll()
        .then((payments) => console.log("Payments:", payments))
        .catch((error) => console.error("Failed to retrieve payments:", error));
    ```

## Conclusion 🚀

The Payment model provides a simple yet effective structure for managing payment records, enabling the system to track the status of transactions.
This helps streamline financial processing by distinguishing between completed and pending payments.
