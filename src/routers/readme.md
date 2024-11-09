# `readme.md`

## Description 📝

This directory contains route modules for various entities in an Express.js application.
These routes manage operations such as user registration and login, order processing, payment handling, item management, and more.
The routes are grouped into individual files, each handling a specific resource, and they are all integrated into a single index.js file to structure the application effectively.

## Purpose 🎯

The purpose of this folder is to organize the routes for different aspects of the system in a modular fashion.
Each route module handles specific resources, such as users, orders, payments, and items, ensuring that the application follows a clean and scalable architecture.
The `index.js` file acts as the entry point to register all routes and map them to their respective paths.

## How It Works 🔍

-   The **`index.js`** file imports and uses all individual routers from their respective files.
-   Each router is responsible for handling routes related to a particular resource (e.g., `addressRouter` handles address-related routes).
-   The routes are then combined under different groupings, such as:

    -   **User and Address Routes** (`/user`, `/address`)
    -   **Order and Payment Routes** (`/order`, `/payment`, `/orderItem`)
    -   **Category and Item Routes** (`/category`, `/item`)

    Each router module follows the RESTful design pattern and includes the necessary CRUD operations for managing resources.

## Directory Structure 📂

```plaintext
routes
|-- addressRouter
|    |-- addressRouter.js         # Handles address-related routes
|    |-- readme.md                # Documentation for addressRouter
|-- categoryRouter
|    |-- categoryRouter.js        # Handles category-related routes
|    |-- readme.md                # Documentation for categoryRouter
|-- itemRouter
|    |-- itemRouter.js            # Handles item-related routes
|    |-- readme.md                # Documentation for itemRouter
|-- orderItemRouter
|    |-- orderItemRouter.js       # Handles order item-related routes
|    |-- readme.md                # Documentation for orderItemRouter
|-- orderRouter
|    |-- orderRouter.js           # Handles order-related routes
|    |-- readme.md                # Documentation for orderRouter
|-- paymentRouter
|    |-- paymentRouter.js         # Handles payment-related routes
|    |-- readme.md                # Documentation for paymentRouter
|-- userRouter
|    |-- userRouter.js            # Handles user-related routes
|    |-- readme.md                # Documentation for userRouter
|-- index.js                     # Entry point to register all routes
|-- readme.md                    # Documentation for all routes
```

## Usage 📦

1. **Install the necessary dependencies**:
    ```bash
    npm install express
    ```
2. **Import and use the routes in your main application file**:
    ```javascript
    const routes = require("./routes");
    app.use("/api", routes); // Use the routes with a base path
    ```
3. **Each individual router**:
   (e.g., addressRouter, userRouter) contains the appropriate routes for handling specific resource actions (CRUD operations).
   Here is a list of the most common routes:
   /address: Routes for creating, updating, and deleting addresses.
   /user: Routes for user registration, login, and profile management.
   /order: Routes for creating, updating, and retrieving orders.
   /payment: Routes for creating and managing payments.
   /orderItem: Routes for handling individual items within an order.
   /category: Routes for managing product categories.
   /item: Routes for managing products.

## Conclusion 🚀

This route structure organizes your Express.js application efficiently, allowing easy scalability and maintenance.
Each resource has its own dedicated router file, which helps keep the code modular and easier to manage.
By centralizing all routes in index.js, you can easily manage and access the routes throughout the application.

For more information, please refer to the individual readme.md files inside each route directory, which provide specific details for the routes of that module.
