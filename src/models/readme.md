# Models Directory Overview 📂

The `models` directory contains all the Sequelize models for managing the application's data.
It is organized into several subdirectories, each representing a different entity or set of related functionalities in the system.
These models define the structure, fields, relationships, and validation rules for the entities within the application.

## Subdirectories and Models 📜

### Categories 📦

The `Categories` directory contains the model representing product categories.
It helps organize products into different groups, allowing efficient retrieval and management of category data.

-   **Model**: `Category`
    -   Fields: `id`, `name`
    -   Relationships: One-to-many with `Items`
    -   Purpose: Categorize items within the system.

### Items 📦

The `Items` directory includes the model for managing individual items in the application, such as products in an e-commerce store.

-   **Model**: `Item`
    -   Fields: `id`, `name`, `price`, `categoryId`, `description`
    -   Relationships: Many-to-one with `Categories`, many-to-many with `Orders`
    -   Purpose: Store product details and link items to their respective categories.

### OrderItems 📦

The `OrderItems` directory defines the model for representing items that are part of specific orders.
This serves as a junction table for managing the many-to-many relationship between `Orders` and `Items`.

-   **Model**: `OrderItem`
    -   Fields: `id`, `orderId`, `itemId`, `quantity`, `totalPrice`
    -   Relationships: Many-to-one with `Orders` and `Items`
    -   Purpose: Link items with orders, track quantities, and prices for each item in an order.

### Orders 📦

The `Orders` directory contains the model for managing customer orders, representing a purchase transaction in the system.

-   **Model**: `Order`
    -   Fields: `id`, `userId`, `orderDate`, `totalAmount`, `status`
    -   Relationships: Many-to-one with `Users`, many-to-many with `Items` through `OrderItems`
    -   Purpose: Track orders made by users, including order status, total amount, and order details.

### Payments 💳

The `Payments` directory defines the model for tracking payment statuses related to orders.

-   **Model**: `Payment`
    -   Fields: `id`, `status`
    -   Purpose: Represents the payment status (completed or pending) for an order.

### Users 👤

The `Users` directory includes the model for managing user data, including their personal details, contact information, and roles within the application.

-   **Model**: `User`
    -   Fields: `id`, `addressId`, `firstName`, `lastName`, `email`, `password`, `phone`, `role`
    -   Relationships: One-to-one with `UserAddresses`, one-to-many with `Orders`
    -   Purpose: Store user details, authenticate and authorize users, and track their orders.

### UserAddresses 🏠

The `UserAddresses` directory holds the model for storing address information for users.

-   **Model**: `UserAddress`
    -   Fields: `id`, `country`, `city`, `street`, `building`, `apartment`, `postal`
    -   Purpose: Store the address of each user for shipping, billing, or profile purposes.

### modelsUtils Directory 📂

The `modelsUtils` directory contains utilities for managing relationships between models and for validating incoming data.

-   **Relations**: Defines relationships between models like `Users`, `Orders`, `Items`, etc.
-   **Validations**: Provides functions for validating user input, including custom validation rules and regular expressions for fields like emails, phone numbers, and other essential data.

## How It Works 🔍

-   **Sequelize ORM**: Each model uses Sequelize to define the schema and the relationships between different entities.
-   **Validation Rules**: Custom validation functions are used to ensure data integrity across the application.
-   **Model Associations**: The models define necessary relationships, such as one-to-many, many-to-one, and many-to-many, allowing for efficient querying and data retrieval.

## Conclusion 🚀

The models directory is essential for managing the core entities in the system.
It provides a well-structured and validated way to handle users, orders, payments, products, and addresses.
By organizing data through these models and leveraging Sequelize's powerful ORM features, the application ensures data consistency, easy maintenance, and efficient data retrieval across the application.

For more detailed usage information, please refer to the individual `readme.md` files in each subdirectory.
