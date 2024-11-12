# Validations Module 📦

## Description 📝

The `validations` module provides a set of utility functions to ensure data integrity and security by validating various fields.
The module includes three main sub-modules:

-   **checkUniqueness**: Validates the uniqueness of fields like email and phone numbers in the database.
-   **containsFalsyValues**: Checks if any required field values are missing or falsy, ensuring no empty or undefined fields are processed.
-   **passwordHandler**: Handles password validation and hashing, ensuring passwords meet security standards before storing or comparing.

## Purpose 🎯

The goal of this module is to facilitate data validation and ensure that critical fields, such as user credentials, are properly validated before any database operations or user authentication processes.

## How It Works 🔍

The module is composed of three key components:

1. **checkUniqueness**:

    - Checks if fields like `email` or `phone` are unique across the database to prevent duplicate records.
    - Functions: `checkFieldUniqueness` and `checkEmailAndPhoneUniqueness`.

2. **containsFalsyValues**:

    - Ensures that all required field values are provided and are not falsy.
    - Function: `containsFalsyValues`.

3. **passwordHandler**:
    - Provides password validation and hashing functionalities.
    - Functions: `validatePassword`, `validatePasswordCreation`, and `getValidHashedPassword`.

## Output 📜

-   **checkUniqueness**: Throws an error if a duplicate value is found for a specified field.
-   **containsFalsyValues**: Throws an `ApiError` if any required field value is falsy (null, undefined, empty, etc.).
-   **passwordHandler**: Returns either the hashed password or throws an error if the validation fails.

## Usage 📦

### 1. Import the necessary functions:

    ```js
    const {
        checkFieldUniqueness,
        checkEmailAndPhoneUniqueness,
    } = require("path/to/checkUniqueness");

    const { containsFalsyValues } = require("path/to/containsFalsyValues");

    const { getValidHashedPassword, validatePassword, validatePasswordCreation } = require("path/to/passwordHandler");
    ```

2. Check uniqueness of one field:

    ```js
    await checkFieldUniqueness("user@example.com", "email", UserModel);
    ```

3. Check uniqueness of email and phone fields:

    ```js
    await checkEmailAndPhoneUniqueness("user@example.com", "1234567890", UserModel); 3. Using containsFalsyValues:
    ```

4. Check for falsy values in an array:

    ```js
    containsFalsyValues(["value1", "value2", "value3"]); // Returns true if all values are valid 4. Using passwordHandler:
    ```

5. Validate and hash a password:

    ```js
    const hashedPassword = await getValidHashedPassword("UserPassword123!");
    ```

6. Compare entered password with stored hash:

    ```js
    await validatePassword("UserPassword123!", storedHashedPassword);
    ```

## Conclusion 🚀

The validations module provides crucial validation functionality to ensure data integrity and security across various operations, from checking for unique fields in a database to ensuring password validity.
This module helps streamline user authentication and data validation processes in a secure and reliable manner.
