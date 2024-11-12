# controllersToManageUsers 📂

The `controllersToManageUsers` directory contains controllers responsible for managing user-related operations, such as user accounts and user addresses.
Each controller encapsulates CRUD functionality for its respective resource, ensuring a modular and maintainable structure.

## Controllers 📋

### 1. `UserController` 👤

The `UserController` manages all user-related operations, including user registration, login, profile updates, password changes, and deletion.
It handles the CRUD operations for user accounts, providing methods for creating, retrieving, updating, and deleting user records.

-   **Main File**: `UserController.js`
-   **Methods**:
    -   `createRecord`: Handles user registration and generates a JWT token.
    -   `getRecord`: Retrieves a specific user's information.
    -   `updateRecord`: Updates user information, such as email or address.
    -   `deleteRecord`: Deletes a user by their ID.
    -   `logIn`: Manages user login and generates a JWT token.
    -   `changePassword`: Allows the user to change their password.

For detailed usage, check out the `UserController` [README](UserController/readme.md).

---

### 2. `UserAddressController` 🏠

The `UserAddressController` is responsible for managing user address records, including creating, updating, retrieving, and deleting user addresses.
It ensures that users can have accurate and updated addresses associated with their accounts.

-   **Main File**: `UserAddressController.js`
-   **Methods**:
    -   `createRecord`: Creates a new user address.
    -   `getRecord`: Retrieves a specific user address.
    -   `updateRecord`: Updates a user address by its ID.
    -   `deleteRecord`: Deletes a user address by its ID.

For more details, refer to the `UserAddressController` [README](UserAddressController/readme.md).

---

## Dependencies 🛠️

-   **Express**: Used for handling HTTP requests and routing in each controller.
-   **ApiError**: A custom error-handling module to standardize error responses across the controllers.
-   **Sequelize Models**: Each controller interacts with Sequelize models (`User`, `UserAddress`) for managing the respective database tables.

## Conclusion 🚀

The `controllersToManageUsers` directory offers a structured and modular approach to managing user data and addresses in an application.
By separating user-related operations into distinct controllers, the system is easier to maintain, scalable, and extensible.

For detailed usage examples, please refer to the individual controller `README` files (`UserController` and `UserAddressController`).
