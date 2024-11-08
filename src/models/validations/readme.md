# Validation Rules and Utilities 📜

## Description 📝

This script provides a set of regular expressions and utility functions for validating various types of data, such as user information, addresses, orders, items, and categories.
It includes predefined validation rules for personal names, geographic names, phone numbers, money values, and more.
The functions `createValidation` and `createValidationIsIn` generate validation objects for different fields based on regular expressions and specific lists of allowed values.

## Purpose 🎯

The purpose of this script is to standardize and streamline the validation process for incoming data, ensuring that it adheres to expected formats and values.
This helps maintain data integrity and improve the overall quality of the system.

## How It Works 🔍

-   **Regular Expressions**: A collection of predefined regular expressions is provided to match various data formats, including names, numbers, postal codes, and more.
-   **Validation Functions**: The functions `createValidation` and `createValidationIsIn` are used to create validation rules for fields based on regular expressions or predefined sets of allowed values.
-   **Validation Rules**: The `validationRules` object contains common validation rules for user data, addresses, orders, items, and categories.

## Output 📜

The output of this script is an object structure containing validation rules for different fields. These rules can be applied to validate data in your application.

## Usage 📦

### Steps to use the script:

1. **Install Dependencies (if required)**:
   This script does not require any external dependencies.

2. **Import the Script**:
    ```javascript
    const {
        validationRules,
        createValidation,
        createValidationIsIn,
    } = require("./path/to/your/script");
    ```
3. **Use Validation Rules**:
   You can directly use validationRules to validate user data, addresses, orders, and more.
   Example:

    ```javascript
    const userValidation = validationRules.user;
    const isValidFirstName = createValidation(
        userValidation.firstName,
        "firstName"
    );
    ```

4. **Create Custom Validations**:
   Use createValidation and createValidationIsIn to create custom validations for fields:
    ```javascript
    const customValidation = createValidation(/^\d+$/, "customField");
    const customStatusValidation = createValidationIsIn(
        ["Active", "Inactive"],
        "status"
    );
    ```

## Conclusion 🚀

This script provides a simple and flexible way to enforce data validation in your application.
By using predefined regular expressions and validation functions, you can ensure that the data entered by users or received from external sources conforms to your expected formats and values.

With these utilities, you can easily extend the validation rules for additional fields or modify existing rules to fit your application needs.
