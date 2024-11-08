# modelsUtils Directory Overview 📂

The `modelsUtils` directory contains utilities for managing Sequelize model associations and validating data.
It consists of two main parts: **relations** and **validations**.

## Description 📝

-   **relations**: Defines the relationships between Sequelize models, ensuring data integrity and efficient querying.
-   **validations**: Provides utility functions and regular expressions for validating user input, orders, items, and more.

## Purpose 🎯

-   **relations**: Establishes necessary model associations for an e-commerce app.
-   **validations**: Ensures incoming data adheres to expected formats, improving data quality.

## How It Works 🔍

-   **relations**: Defines relationships such as one-to-many, one-to-one between models like User, Order, Item, etc.
-   **validations**: Uses regular expressions and functions like `createValidation` to validate data fields like names, phone numbers, and statuses.

## Usage 📦

### relations:

1. Install Sequelize:
    ```bash
    npm install sequelize
    ```
2. Initialize relations:
    ```javascript
    const initRelations = require("./path/to/relations");
    initRelations(sequelize);
    ```

### validations:

1. Import validation functions:
    ```javascript
    const {
        validationRules,
        createValidation,
    } = require("./path/to/validations");
    ```
2. Use validation:
    ```javascript
    const userValidation = validationRules.user;
    const isValid = createValidation(userValidation.firstName, "firstName");
    ```

## Conclusion 🚀

`modelsUtils` helps you manage model relationships and enforce data validation, ensuring efficient data handling and integrity in your application.
