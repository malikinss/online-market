# `dbConnect.js` 🗄️

## Description 📝

The `dbConnect.js` file initializes and configures a Sequelize connection to an SQLite database, allowing the application to manage and interact with the database seamlessly.
This setup is crucial for data storage, especially in scenarios where data persistence is required across sessions.

## Purpose 🎯

This file is designed to create a single database instance using Sequelize with SQLite, ensuring centralized and consistent database access across the application.

## How It Works 🔍

The `dbConnect.js` file exports a Sequelize instance configured to:

-   Use SQLite as the database engine, chosen for its lightweight and file-based structure.
-   Store data in `onlineMarket.db`, located in the `src` directory.
-   Suppress logging to keep the console clean unless explicitly enabled, which can help reduce noise during development.

## Usage 📦

1. Place the `dbConnect.js` file in your project's `src` folder.
2. Import the Sequelize instance in your project files where database interaction is required:
    ```javascript
    const sequelize = require("./src/dbConnect");
    ```
3. Use this instance to define models, perform queries, and manage your database within the application.

## Example Code 💻

Here's an example of how to import and use the database connection from `dbConnect.js`:

```javascript
const sequelize = require("./src/dbConnect");
const { DataTypes } = require("sequelize");

// Define a sample model
const Product = sequelize.define("Product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

// Sync models with the database
sequelize.sync().then(() => {
    console.log("Database synchronized");
});
```

## Conclusion 🚀

The `dbConnect.js` file simplifies the setup of a Sequelize database connection to an SQLite database, providing a centralized, reusable connection instance.
This structure enhances maintainability and helps streamline database interactions within your application.
