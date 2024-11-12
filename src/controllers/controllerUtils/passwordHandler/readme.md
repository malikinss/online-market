# Password Validation and Hashing

This module provides functions for password validation and hashing.
It includes:

-   **Password Validation**: Verifies if the entered password matches the currently stored hashed password.
-   **Password Creation Validation**: Ensures the password meets specific security requirements (uppercase, lowercase, digit, and special character).
-   **Password Hashing**: Hashes the password after it has been validated, ensuring the password meets the security requirements.

## Description 📝

This module handles password validation and hashing for user authentication.
It ensures that:

-   The entered password matches the stored hashed password.
-   The password meets security standards, including length and character type requirements.
-   The password is securely hashed using bcrypt.

## Purpose 🎯

The purpose of this module is to provide secure password handling, including:

-   Ensuring password validity during user login.
-   Enforcing password creation rules.
-   Hashing passwords to ensure they are stored securely.

## How It Works 🔍

The module provides three key functions:

1. **validatePassword**: Compares the entered password with the stored hashed password.
2. **validatePasswordCreation**: Checks if the password meets the required security criteria (at least one uppercase letter, one lowercase letter, one digit, and one special character).
3. **getValidHashedPassword**: Validates and hashes the password asynchronously.

### Password Validation Process:

-   The `validatePassword` function compares the entered password with the hashed version stored in the database.
-   The `validatePasswordCreation` function uses a regular expression to ensure the password follows security standards before it can be hashed.

## Output 📜

-   **validatePassword**:
    -   Returns an error if the password is invalid.
-   **validatePasswordCreation**:
    -   Returns `true` if the password is valid, otherwise triggers an error.
-   **getValidHashedPassword**:
    -   Returns the hashed password if validation is successful.
    -   If validation fails, triggers an error.

## Usage 📦

### 1. Install bcrypt:

    ```bash
    npm install bcrypt
    ```

### 2. Import the module:

    ```js
    const { getValidHashedPassword } = require('path/to/passwordModule');
    ```

### 3. Validate and Hash a Password:

    ```js
    const password = 'UserPassword123!';
    const hashedPassword = await getValidHashedPassword(password, next);
    ```

### 4. Compare Passwords:

    ```js
    const enteredPassword = 'UserPassword123!';
    const storedHashedPassword = 'storedHashedPasswordHere';
    await validatePassword(enteredPassword, storedHashedPassword, next);
    ```

## Conclusion 🚀

This module ensures that passwords are validated and hashed securely before being stored or compared.
It provides an easy-to-use API for handling password creation, validation, and hashing, ensuring strong security standards are met.
