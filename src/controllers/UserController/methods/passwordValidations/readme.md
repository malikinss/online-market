# Password Validation and Verification Module 🛡️

This module provides essential functionality for validating and verifying passwords, ensuring they meet specific security standards and match stored credentials.
It is primarily used in authentication processes, leveraging the `bcrypt` library for secure password hashing and comparison.

## Description 📝

The module includes two functions:

1. **validateNewPassword**: Checks if a new password meets the required security criteria.
2. **verifyPasswordMatch**: Verifies if an input password matches the stored hashed password.

## Purpose 🎯

The primary goal of this module is to enforce strong password standards and validate password authenticity, enhancing security during user authentication.

## How It Works 🔍

-   **validateNewPassword** checks if a new password meets these criteria:

    -   8 to 20 characters in length
    -   Contains at least one uppercase letter, one lowercase letter, one digit, and one special character
    -   Throws an error if these requirements are not met.

-   **verifyPasswordMatch** securely compares the input password with the stored hashed password. It throws an error if the passwords do not match.

## Usage 📦

1. **Install the `bcrypt` package** (if not already installed):

    ```bash
    npm install bcrypt
    ```

2. **Include the module in your code**:

    ```javascript
    const {
        validateNewPassword,
        verifyPasswordMatch,
    } = require("./path/to/your/module");
    ```

3. **Validate a new password**:

    ```javascript
    try {
        validateNewPassword("YourStrongPassword123!");
        console.log("Password is valid.");
    } catch (error) {
        console.error(error.message); // Outputs validation error if the password is invalid.
    }
    ```

4. **Verify an input password against a stored hashed password**:
    ```javascript
    try {
        await verifyPasswordMatch("UserInputPassword", "storedHashedPassword");
        console.log("Passwords match.");
    } catch (error) {
        console.error(error.message); // Outputs authentication error if passwords do not match.
    }
    ```

## Output 📜

The functions either return successfully or throw an error with a specific message:

-   **validateNewPassword**: Throws an error if the password does not meet security requirements.
-   **verifyPasswordMatch**: Throws an error if the passwords do not match.

## Conclusion 🚀

This module helps enforce robust password policies and ensures secure password authentication, using reliable bcrypt hashing and comparison methods.
