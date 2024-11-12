# controllersToManageItems 📂

The `controllersToManageItems` directory contains two key modules—`CategoryController` and `ItemController`—which handle CRUD operations for managing categories and items in the database, respectively.
Both modules are structured for maintainability and modularity, with separate files for each CRUD operation method.

## Controllers 📋

### 1. `CategoryController` 📦

The `CategoryController` is responsible for managing CRUD operations related to categories in the database.
It provides methods for creating, reading, updating, and deleting categories, ensuring a clean and modular structure.

-   **Main File**: `CategoryController.js`
-   **Methods**:
    -   `createRecord`: Creates a new category.
    -   `getRecords`: Retrieves all categories.
    -   `updateRecord`: Updates an existing category's name.
    -   `deleteRecord`: Deletes a category by its ID.

For detailed usage, check out the `CategoryController` [README](CategoryController/readme.md).

**Method Files**:

-   `createCategory.js`
-   `deleteCategory.js`
-   `getCategories.js`
-   `updateCategory.js`

---

### 2. `ItemController` 🛒

The `ItemController` is responsible for managing CRUD operations related to items in the database.
It handles creating, reading, updating, and deleting items, ensuring that items are properly managed.

-   **Main File**: `ItemController.js`
-   **Methods**:
    -   `createRecord`: Creates a new item.
    -   `getRecords`: Retrieves all items.
    -   `getRecord`: Retrieves a specific item by its ID.
    -   `updateRecord`: Updates an existing item.
    -   `deleteRecord`: Deletes an item by its ID.

For detailed usage, check out the `ItemController` [README](ItemController/readme.md).

**Method Files**:

-   `createItem.js`
-   `deleteItem.js`
-   `getItem.js`
-   `getItems.js`
-   `updateItem.js`

---

## Dependencies 🛠️

-   **Express**: Used for handling HTTP requests and routing in each controller.
-   **ApiError**: A custom error-handling module to standardize error responses across the controllers.
-   **controllerUtils**: Utility functions for validations and error messages.
-   **Sequelize Models**: Each controller interacts with Sequelize models (`Category`, `Item`) for managing the respective database tables.

---

## Conclusion 🚀

The `controllersToManageItems` directory provides a clean and modular approach for managing categories and items in your application.
By separating each operation into its own method file, the system remains maintainable and scalable. The use of consistent error handling and utility functions ensures efficient and reliable interactions with the database.
For detailed usage examples, please refer to the individual controller `README` files (`CategoryController` and `ItemController`).
