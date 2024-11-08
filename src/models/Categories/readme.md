# Category Model 🗂️

## Description 📝

This module defines a `Category` model using Sequelize to represent a category entity in the database.
Each category has a unique `id` and `name`, and data validation is applied to ensure the integrity of the `name` field.

## Purpose 🎯

The `Category` model enables the organization of items into categories by storing a unique identifier (`id`) and a validated, unique category `name`.

## How It Works 🔍

1. **Database Setup**:
   Connects to a Sequelize instance from `dbConnect`.
2. **Field Definitions**:
    - `id`: Primary key, auto-incremented integer.
    - `name`: A unique, non-null string, validated with custom rules to meet specific criteria.
3. **Validation**:
    - Custom validation rules are imported and applied using the `createValidation` function with `validationRules.category.name`.

## Fields 📜

-   **id**: Auto-incremented integer, primary key.
-   **name**: String, must be unique and non-null. It follows specified validation rules to ensure a valid format.

## Usage 📦

1. **Import Model**:

    ```javascript
    const Category = require("./models/Categories/Categories");
    ```

2. **Create a Category**:

    ```javascript
    Category.create({ name: "Electronics" })
        .then((category) => console.log("Category created:", category))
        .catch((error) => console.error("Failed to create category:", error));
    ```

3. **Retrieve Categories**:
    ```javascript
    Category.findAll()
        .then((categories) => console.log("Categories:", categories))
        .catch((error) =>
            console.error("Failed to retrieve categories:", error)
        );
    ```

## Conclusion 🚀

The Category model provides a structured way to manage and validate categories within the application.
With Sequelize, the model integrates directly with the database and leverages custom validation to ensure data consistency.
