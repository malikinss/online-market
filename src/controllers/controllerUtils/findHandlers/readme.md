# Database Query Utility Functions

This module contains utility functions for querying a database using Sequelize.
It includes functions to find records in a model with various conditions such as excluding a specific user, filtering by a field, and including related models.

## Description 📝

The functions in this module interact with Sequelize models to search and filter records based on various parameters.
Each function is designed to handle specific querying needs, including:

-   Finding a record excluding a specific ID.
-   Finding a record by field and value.
-   Fetching all records from a model.
-   Fetching multiple records with filters and included relationships.

## Purpose 🎯

These functions are used to perform dynamic queries in a Sequelize-based application.
They help simplify the process of searching and retrieving data while handling errors appropriately.
The utility functions improve maintainability by providing reusable code for database queries.

## How It Works 🔍

Each function performs the following tasks:

1. **findModelExcludingId** - Finds a record by a specific field and value, excluding a user based on the given ID.
2. **findRecordByField** - Searches for a record in a model based on a field and its value.
3. **findAllRecords** - Fetches all records from a given model.
4. **findRecordsByField** - Retrieves multiple records from a model based on a field and value.
5. **findRecordsByFieldInclude** - Retrieves records based on filters and includes related models (with support for fetching a single or multiple records).

These functions ensure that queries are safely executed with error handling, throwing appropriate API errors when necessary.

## Output 📜

The output of these functions is typically:

-   A single record if one is found.
-   An array of records if multiple matches are found.
-   `null` if no records are found.

In case of errors, custom API errors are thrown, indicating the type of failure.

## Usage 📦

### **Step 1**: Import the module

    ```js
    const dbUtils = require("./path/to/dbUtils");
    ```

### **Step 2**: Use the desired function

-   **_Example 1_**: Find a user excluding a specific ID
    ```js
    const user = await dbUtils.findModelExcludingId(
        value,
        field,
        UserModel,
        userId
    );
    ```
-   **_Example 2_**: Fetch all records from a model
    ```js
    const records = await dbUtils.findAllRecords(Model);
    ```
-   **_Example 3_**: Find a record by a field and value
    ```js
    const record = await dbUtils.findRecordByField(field, value, Model);
    ```
-   **_Example 4_**: Fetch records with a filter
    ```js
    const filteredRecords = await dbUtils.findRecordsByField(
        field,
        value,
        Model
    );
    ```
-   **_Example 5_**: Fetch records with includes and filters
    ```js
    const records = await dbUtils.findRecordsByFieldInclude(
        Model,
        whereCondition,
        fields,
        includes,
        true
    );
    ```

### **Step 3**: Handle errors

All functions throw ApiError with a specific error message, so make sure to handle these errors in a try-catch block.

## Conclusion 🚀

This utility module simplifies querying with Sequelize by providing reusable functions to find and filter records.
It ensures proper error handling and helps you manage database queries more efficiently, promoting cleaner and more maintainable code.
