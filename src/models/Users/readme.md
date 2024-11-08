# User Model 👤

## Description 📝

The `User` model defines a schema for managing user information within the system using Sequelize.
This model includes essential fields such as `addressId`, `firstName`, `lastName`, `email`, `password`, `phone`, and `role`, each with specific validations to ensure data integrity and consistency.

## Purpose 🎯

The purpose of the `User` model is to represent and store user details, linking users to their address records and enforcing strict validation for fields like `email`, `phone`, and `role`. It ensures the unique identification and authentication of each user within the application.

## How It Works 🔍

1. **Database Setup**:
   Connects to a Sequelize instance configured in `dbConnect`.
2. **Field Definitions**:
    - `id`: Primary key, auto-incremented integer that uniquely identifies each user.
    - `addressId`: Foreign key referencing the `id` field in the `addresses` table, establishing a relationship with a user's address.
    - `firstName`: String representing the user’s first name, validated with custom rules.
    - `lastName`: String representing the user’s last name, validated with custom rules.
    - `email`: Unique, non-null string validated to ensure it is in email format.
    - `password`: Non-null string for user password storage.
    - `phone`: Unique, non-null string validated for proper format.
    - `role`: String representing the user’s role, restricted to allowed values and defaults to "user".
3. **Validation**:
    - Uses `createValidation` and `createValidationIsIn` for fields like `firstName`, `lastName`, `phone`, and `role`.
    - `email` is validated with Sequelize's `isEmail` validator, with a custom error message from `messageHandling`.

## Fields 📜

-   **id**: Auto-incremented integer, primary key.
-   **addressId**: Integer, foreign key linking to the `addresses` table.
-   **firstName**: String, validated for name requirements.
-   **lastName**: String, validated for name requirements.
-   **email**: Unique, validated email string.
-   **password**: String for storing user password (recommended to be hashed).
-   **phone**: Unique, validated phone number.
-   **role**: String, validated for allowed role values with a default of "user".

## Usage 📦

1. **Import Model**:
    ```javascript
    const User = require("./models/Users/Users");
    ```
2. **Create a User**:

    ```javascript
    User.create({
        addressId: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "securepassword123",
        phone: "123-456-7890",
        role: "user",
    })
        .then((user) => console.log("User created:", user))
        .catch((error) => console.error("Failed to create user:", error));
    ```

3. **Retrieve All Users**:
    ```javascript
    User.findAll()
        .then((users) => console.log("Users:", users))
        .catch((error) => console.error("Failed to retrieve users:", error));
    ```

## Conclusion 🚀

The User model provides a comprehensive structure for managing user information, including essential details and validations for user role, contact information, and identification fields.
By linking users to addresses, this model helps maintain a structured and relational database setup for user management.
