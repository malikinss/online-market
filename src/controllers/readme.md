# controllers 📂

The `controllers` directory contains various subdirectories, each focusing on managing different aspects of an application, such as items, orders, users, and utility functions.
Each subdirectory is organized for modularity, with controllers dedicated to handling specific CRUD operations and functionalities for their respective resources.

## Controllers Overview 📋

### 1. `controllersToManageItems` 📦

This subdirectory contains controllers for managing items and categories within the database.

-   **CategoryController**: Handles CRUD operations for item categories.

    -   **Main File**: `CategoryController.js`
    -   **Methods**:
        -   `createRecord`: Creates a new category.
        -   `getRecords`: Retrieves all categories.
        -   `updateRecord`: Updates a category's name.
        -   `deleteRecord`: Deletes a category by ID.

-   **ItemController**: Manages CRUD operations for individual items.
    -   **Main File**: `ItemController.js`
    -   **Methods**:
        -   `createRecord`: Creates a new item.
        -   `getRecords`: Retrieves all items.
        -   `getRecord`: Retrieves an item by ID.
        -   `updateRecord`: Updates an item.
        -   `deleteRecord`: Deletes an item by ID.

For more details, refer to the `controllersToManageItems` [README](controllersToManageItems/readme.md).

---

### 2. `controllersToManageOrders` 🛒

This subdirectory includes controllers to manage orders, order items, and payments.

-   **OrderController**: Manages CRUD operations related to orders.

    -   **Main File**: `OrderController.js`
    -   **Methods**:
        -   `createRecord`: Creates a new order.
        -   `getRecord`: Retrieves a specific order by ID.
        -   `getRecords`: Retrieves all orders.
        -   `getRecordsPerUser`: Retrieves orders for a specific user.
        -   `updateRecord`: Updates an order.
        -   `deleteRecord`: Deletes an order by ID.

-   **OrderItemController**: Handles CRUD operations for items within orders.

    -   **Main File**: `OrderItemController.js`
    -   **Methods**:
        -   `createRecord`: Creates a new order item.
        -   `getRecord`: Retrieves an order item by ID.
        -   `getRecords`: Retrieves all order items for a specific order.
        -   `updateRecord`: Updates the quantity of an order item.
        -   `deleteRecord`: Deletes an order item by ID.

-   **PaymentController**: Manages payment-related operations for orders.
    -   **Main File**: `PaymentController.js`
    -   **Methods**:
        -   `createRecord`: Creates a new payment.
        -   `getRecord`: Retrieves a payment by ID.
        -   `updateRecord`: Updates payment status.
        -   `deleteRecord`: Deletes a payment record by ID.

For detailed usage, refer to the `controllersToManageOrders` [README](controllersToManageOrders/readme.md).

---

### 3. `controllersToManageUsers` 👤

This subdirectory includes controllers that manage user accounts and user addresses.

-   **UserController**: Handles CRUD operations related to user accounts.

    -   **Main File**: `UserController.js`
    -   **Methods**:
        -   `createRecord`: Registers a new user and generates a JWT token.
        -   `getRecord`: Retrieves user information.
        -   `updateRecord`: Updates user data.
        -   `deleteRecord`: Deletes a user by ID.
        -   `logIn`: Logs in a user and generates a JWT token.
        -   `changePassword`: Changes a user’s password.

-   **UserAddressController**: Manages user addresses.
    -   **Main File**: `UserAddressController.js`
    -   **Methods**:
        -   `createRecord`: Adds a new user address.
        -   `getRecord`: Retrieves a specific user address.
        -   `updateRecord`: Updates a user address.
        -   `deleteRecord`: Deletes a user address by ID.

For more details, see the `controllersToManageUsers` [README](controllersToManageUsers/readme.md).

---

### 4. `controllerUtils` 📦

The `controllerUtils` directory provides utility functions to streamline common operations such as database queries, JWT generation, and data validation.

-   **findHandlers**: Functions for database querying and filtering.
-   **generateJWT**: Securely generates JSON Web Tokens.
-   **messageHandlers**: Manages user messages and responses.
-   **validateData**: Ensures data validity across controllers.

For additional information, check the `controllerUtils` [README](controllerUtils/readme.md).

---

## Shared Dependencies 🛠️

-   **Express**: Used for handling HTTP requests and routing in each controller.
-   **ApiError**: Standardizes error responses across controllers.
-   **Sequelize Models**: Each controller interacts with respective Sequelize models to manage database operations.

## Conclusion 🚀

The `controllers` directory organizes application logic into modular subdirectories, each focused on a different aspect of the application.
This structure promotes maintainability, scalability, and separation of concerns.
For more details on specific controllers, refer to the individual `README` files within each subdirectory.
