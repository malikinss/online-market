# Order Model 📦

## Description 📝

The `Order` model defines a schema for handling customer orders within the system using Sequelize.
Each `Order` entry tracks details such as `userId`, `paymentId`, `totalPrice`, and `status`, with validations to ensure data accuracy and consistency.

## Purpose 🎯

This model represents customer orders, linking them to users and payments, while enforcing data validation on key fields.
The `Order` model also maintains the status and total price of each order, facilitating effective order management.

## How It Works 🔍

1. **Database Setup**:
   Connects to a Sequelize instance from `dbConnect`.
2. **Field Definitions**:
    - `id`: Primary key, auto-incremented integer that uniquely identifies each order.
    - `userId`: Foreign key referencing the `id` field in the `users` table, linking the order to a specific user.
    - `paymentId`: Foreign key referencing the `id` field in the `payments` table, linking the order to a payment record.
    - `totalPrice`: Decimal value representing the total amount for the order, validated with custom rules for correct format.
    - `status`: String indicating the order's status (e.g., "Unpaid"), validated to allow only specified values.
3. **Validation**:
    - Utilizes `createValidation` and `createValidationIsIn` functions with predefined rules from `validationHandling` for fields like `totalPrice` and `status`.
    - `userId` and `paymentId` fields are validated to be integers.

## Fields 📜

-   **id**: Auto-incremented integer, primary key.
-   **userId**: Integer, foreign key linking to the `users` table.
-   **paymentId**: Integer, foreign key linking to the `payments` table.
-   **totalPrice**: Decimal, represents the order’s total price, validated for correct format.
-   **status**: String, represents the order's status, with values restricted to allowed statuses.

## Usage 📦

1. **Import Model**:
    ```javascript
    const Order = require("./models/Orders/Orders");
    ```
2. **Create an Order**:

    ```javascript
    Order.create({
        userId: 1,
        paymentId: 101,
        totalPrice: 250.75,
        status: "Unpaid",
    })
        .then((order) => console.log("Order created:", order))
        .catch((error) => console.error("Failed to create order:", error));
    ```

3. **Retrieve All Orders**:
    ```javascript
    Order.findAll()
        .then((orders) => console.log("Orders:", orders))
        .catch((error) => console.error("Failed to retrieve orders:", error));
    ```

## Conclusion 🚀

The Order model provides a structured way to manage customer orders, linking each order to users and payment records.
With custom validations, the model enforces consistency in the order data, enabling efficient tracking of order status and total price.
