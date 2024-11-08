# Item Model 🛒

## Description 📝

The `Item` model defines an entity for managing items within an inventory system using Sequelize.
Each `Item` has attributes such as `id`, `categoryId`, `name`, `description`, `price`, `stock`, and `img`, with validations in place for fields like `name`, `price`, `stock`, and `img`.

## Purpose 🎯

The purpose of the `Item` model is to represent products or items in the system, linking each item to a category and ensuring data consistency and integrity through validations.

## How It Works 🔍

1. **Database Setup**:
   Connects to a Sequelize instance configured in `dbConnect`.
2. **Field Definitions**:
    - `id`: Primary key, auto-incremented integer that uniquely identifies each item.
    - `categoryId`: Foreign key referencing the `id` field in the `categories` table, establishing a relationship with the `Category` model.
    - `name`: A unique, non-null string, validated with custom rules to ensure uniqueness and proper format.
    - `description`: Optional text field for providing additional details about the item.
    - `price`: Integer representing the item's price, validated to meet specified criteria.
    - `stock`: Integer tracking the item’s stock quantity, defaulted to 0 and validated for correct value.
    - `img`: URL string for the item's image, validated to ensure proper format.
3. **Validation**:
    - Utilizes `createValidation` with specific validation rules (imported from `validationHandling`) for fields such as `name`, `price`, `stock`, and `img`.

## Fields 📜

-   **id**: Auto-incremented integer, primary key.
-   **categoryId**: Integer, foreign key linking the item to a category.
-   **name**: Unique, non-null string with specific validation rules.
-   **description**: Optional text field for item description.
-   **price**: Integer, non-null, validated to ensure correct format.
-   **stock**: Integer, default value of 0, validated to meet inventory requirements.
-   **img**: Non-null string URL for the item's image, validated for format.

## Usage 📦

1. **Import Model**:
    ```javascript
    const Item = require("./models/Items/Items");
    ```
2. **Create an Item**:

    ```javascript
    Item.create({
        categoryId: 1,
        name: "Laptop",
        description: "A high-performance laptop",
        price: 1500,
        stock: 10,
        img: "https://example.com/laptop.png",
    })
        .then((item) => console.log("Item created:", item))
        .catch((error) => console.error("Failed to create item:", error));
    ```

3. **Retrieve All Items**:
    ```javascript
    Item.findAll()
        .then((items) => console.log("Items:", items))
        .catch((error) => console.error("Failed to retrieve items:", error));
    ```

## Conclusion 🚀

The Item model provides a detailed schema for managing products in an inventory, including fields for categorization, pricing, stock management, and image storage.
Sequelize handles the database interactions, while validations ensure data reliability and integrity.
