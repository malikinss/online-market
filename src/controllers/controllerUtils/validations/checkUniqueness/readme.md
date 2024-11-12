# Field Uniqueness Checker 📝

## Description 📝

This module provides utility functions to validate the uniqueness of specified fields (like email or phone) in a given model.
It helps ensure that fields are unique across the database by checking for duplicates before creating or updating records.

## Purpose 🎯

To prevent duplicate records in a database by verifying the uniqueness of specified fields such as `email` or `phone`.

## How It Works 🔍

The module includes two functions:

1. `checkFieldUniqueness` - Checks if a specific field (e.g., `email` or `phone`) is unique within the database, excluding an optional user ID.
2. `checkEmailAndPhoneUniqueness` - Simultaneously checks if both `email` and `phone` fields are unique in the specified model.

These functions throw an error if a duplicate field is found.

## Output 📜

If a duplicate value is found for the specified field(s), an error with a detailed message is thrown:
`"A user with this [fieldName] already exists"`

## Usage 📦

1. **Import the module**:

    ```js
    const {
        checkFieldUniqueness,
        checkEmailAndPhoneUniqueness,
    } = require("path/to/your/module");
    ```

2. **Use `checkFieldUniqueness` to check one field**:

    ```js
    await checkFieldUniqueness("user@example.com", "email", UserModel);
    ```

3. **Use `checkEmailAndPhoneUniqueness` to check both email and phone fields simultaneously**:
    ```js
    await checkEmailAndPhoneUniqueness(
        "user@example.com",
        "1234567890",
        UserModel
    );
    ```

## Conclusion 🚀

This module is essential for ensuring data integrity by enforcing unique field constraints in the database, minimizing the risk of duplicate user records.
