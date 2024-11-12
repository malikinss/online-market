# controllersToManageOrders 📂

The `controllersToManageOrders` directory contains the controllers responsible for managing key aspects of an order management system, including orders, order items, and payments.
Each controller handles CRUD operations for its respective resource, ensuring a clean, modular, and maintainable structure.

## Controllers 📋

### 1. `OrderController` 📦

The `OrderController` is responsible for managing CRUD operations related to orders in the database.
It provides methods for creating, reading, updating, and deleting orders, ensuring smooth order lifecycle management.

-   **Main File**: `OrderController.js`
-   **Methods**:
    -   `createRecord`: Creates a new order.
    -   `getRecord`: Retrieves a specific order by its ID.
    -   `getRecords`: Retrieves all orders.
    -   `getRecordsPerUser`: Retrieves orders for a specific user.
    -   `updateRecord`: Updates an existing order.
    -   `deleteRecord`: Deletes an order by ID.

For detailed usage, check out the `OrderController` [README](OrderController/readme.md).

---

### 2. `OrderItemController` 🛒

The `OrderItemController` handles CRUD operations for items within orders.
It ensures that each order has the correct items, quantities, and details by managing operations related to order items.

-   **Main File**: `OrderItemController.js`
-   **Methods**:
    -   `createRecord`: Creates a new order item.
    -   `getRecord`: Retrieves an order item by its ID.
    -   `getRecords`: Retrieves all order items for a specific order.
    -   `updateRecord`: Updates the quantity of an order item.
    -   `deleteRecord`: Deletes an order item by ID.

For more details, refer to the `OrderItemController` [README](OrderItemController/readme.md).

---

### 3. `PaymentController` 💳

The `PaymentController` is responsible for managing payment-related operations for orders.
It handles creating, retrieving, updating, and deleting payment records, ensuring the correct payment status is associated with each order.

-   **Main File**: `PaymentController.js`
-   **Methods**:
    -   `createRecord`: Creates a new payment for an order.
    -   `getRecord`: Retrieves a payment by its ID.
    -   `updateRecord`: Updates the payment status.
    -   `deleteRecord`: Deletes a payment record by ID.

For more information, see the `PaymentController` [README](PaymentController/readme.md).

---

## Dependencies 🛠️

-   **Express**: Used for handling HTTP requests and routing in each controller.
-   **ApiError**: A custom error-handling module to standardize error responses across the controllers.
-   **Sequelize Models**: Each controller interacts with Sequelize models (`Order`, `OrderItem`, `Payment`) for managing the respective database tables.

## Conclusion 🚀

The `controllersToManageOrders` directory provides a set of modular controllers for managing orders, order items, and payments in an e-commerce application.
By separating each responsibility into its own controller, the system remains maintainable, scalable, and easy to expand.

For detailed usage examples, please refer to the individual controller `README` files (`OrderController`, `OrderItemController`, and `PaymentController`).
