# Backend for Online Marketplace 🚀

## Description 📝

This backend project is designed for an online marketplace, handling core business logic like user management, orders, payments, items, categories, and more.
It is built with **Express.js**, **Sequelize ORM**, and **SQLite** (or PostgreSQL in production) to handle database interactions.
The project is modular, organized in distinct directories for controllers, models, routers, middleware, and static files, ensuring scalability and maintainability.

The backend includes essential features such as user authentication, item management, order processing, and payment integration, all of which are accessible through RESTful API endpoints.

## Purpose 🎯

The primary purpose of this backend is to power an e-commerce platform.
It offers functionalities such as:

-   User authentication and management (registration, login, profile)
-   Item and category management
-   Order and payment processing
-   User address management
-   Robust error handling and authentication mechanisms

The backend is structured to be easily extended with additional features as the platform grows.

## How It Works 🔍

### Directory Structure 📂

```plaintext
src
├───config                # Configuration files (e.g., database connection)
├───controllers           # Controllers for managing different resources
│   ├───controllersToManageItems
│   │   ├───CategoryController
│   │   └───ItemController
│   ├───controllersToManageOrders
│   │   ├───OrderController
│   │   ├───OrderItemController
│   │   └───PaymentController
│   ├───controllersToManageUsers
│   │   ├───UserAddressController
│   │   └───UserController
│   └───controllerUtils   # Utility functions for controllers (e.g., validation, JWT generation)
├───middleware            # Middlewares (e.g., authentication, error handling)
│   ├───authHandling      # Auth-related middlewares
│   ├───errorHandling     # Error handling middlewares
├───models                # Database models (e.g., Users, Orders, Items)
├───routers               # Route definitions (e.g., userRouter, orderRouter)
├───static                # Folder for static files (e.g., images)
├───app.js                # Main server file, where the app is initialized
└───onlineMarket.db       # SQLite database file
```

### Folder Structure Details 📂

-   `config`: Contains the database connection configuration and other environment-specific settings.
-   `controllers`: Implements the business logic for each resource (users, items, orders, etc.).
-   `middleware`: Defines middleware for authentication, authorization, error handling, etc.
-   `models`: Defines Sequelize models and relationships for entities like users, orders, items, etc.
-   `routers`: Handles routing of API requests to the appropriate controllers.
-   `static`: Contains static files such as images, documents, and other assets.
-   `app.js`: Main entry point for the Express.js server.
-   `onlineMarket.db`: SQLite database used for local development.

## Core Components 🔧

### 1. **config**:

The `config` directory holds important configuration files that help manage environment variables and application settings.

-   **dbConnect.js**: Contains the database connection configuration using Sequelize. It handles the setup for the SQLite database in development and can be switched to PostgreSQL for production using the `DATABASE_URL` environment variable.
-   **.env**: Stores sensitive data such as API keys, database URLs, and other environment-specific variables. This file is loaded at runtime using `dotenv` to provide configuration values across the app.

### 2. Controllers:

Handle the business logic for each resource (users, orders, items, etc.).
They define methods for CRUD operations and are organized into specialized directories for managing specific entities.

-   `CategoryController`: Manages categories of products.
-   `ItemController`: Manages products (items) in the marketplace.
-   `OrderController`: Manages order creation, status updates, and retrieval.
-   `OrderItemController`: Manages order item creation, updates, and retrieval.
-   `PaymentController`: Handles payment processing.
-   `UserController`: Handles user registration, login, profile updates, and password validation.
-   `UserAddressController`: Manages user address data.

### 3. Middleware:

-   `authHandling`: Contains middleware for JWT authentication and role-based access control.
-   `errorHandling`: Centralized error handling middleware that catches errors across the app and formats them for API responses.

### 4. Models:

The database is managed using Sequelize ORM.
Models are defined for all entities in the application, including users, orders, payments, items, categories, etc.
These models interact with the database to store, update, and retrieve data.

-   Models are defined under the `models` directory, with relationships between models handled in `modelsUtils/relations`.

### 5. Routers:

-   Define the routes for accessing the various endpoints in the application.
    Routers are separated into categories like user management, order management, etc.

-   Examples include:

    -   `addressRouter` for userAddress-related actions (creation, fetching, updating, and deletion)
    -   `userRouter` for user-related actions (registration, login, profile updates)
    -   `categoryRouter` for category-related actions (creation, fetching, updating, and deletion)
    -   `itemRouter` for product management (creation, fetching, updating, and deletion)
    -   `orderRouter` for handling orders (creation, fetching, updating, and deletion)
    -   `orderItemRouter` for handling order items (creation, fetching, updating, and deletion)
    -   `paymentRouter` for payment operations (creation, fetching, updating, and deletion)

### 6. Static Files:

Static files like images are served from the `static` folder and can be accessed via defined routes.

### 7. Database:

The database is managed via Sequelize.
In development, it uses an SQLite database (`onlineMarket.db`), and in production, it can be switched to PostgreSQL using the `DATABASE_URL` environment variable.

### 8. **app.js**:

The main entry point of the application, where the Express.js server is initialized and configured. It sets up the middleware, routes, and error handling for the entire app.

-   **Server Initialization**: Configures the Express server and defines the port (`PORT`).
-   **Middleware**: Sets up middleware for CORS, JSON parsing, file uploads, and error handling.
-   **Routing**: Defines the `/api` route for accessing the application’s API.
-   **Database Connection**: Establishes a connection to the database via Sequelize, authenticates the connection, and syncs models with the database.
-   **Error Handling**: Ensures proper error handling using a custom middleware that catches all errors in the application and returns formatted responses.

## Key Features ⚙️

-   **JWT Authentication**: Users are authenticated using JWT tokens, ensuring secure API access.
-   **Role-Based Access Control (RBAC)**: Users are assigned roles (e.g., admin, user), and middleware ensures proper access control for different routes.
-   **File Uploads**: File upload functionality is supported using the `express-fileupload` middleware. This is useful for handling product images and other files.
-   **Error Handling**: A centralized error-handling system catches errors and responds with appropriate error messages and status codes.
-   **Database Management**: Sequelize ORM is used to define and manage models, migrations, and relationships between entities like users, orders, payments, etc.
-   **Static Files**: Serve static resources such as images or documents stored in the `static` folder.

## API Routes 📡

All API routes are prefixed with `/api`.
Some of the key routes include:

-   `/api/user`: Manage user registration, login, and profile management.
-   `/api/address`: Manage user addresses.
-   `/api/order`: Create, update, and view orders.
-   `/api/order-item`: Create, update, and view order items.
-   `/api/item`: Manage products (create, update, delete items).
-   `/api/category`: Manage product categories.
-   `/api/payment`: Handle payment operations.

## Models & Database Relations 🔄

The models are structured as follows:

-   `Users`: Users are authenticated and authorized for various operations.
-   `Orders`: Orders are tied to users and contain multiple order items.
-   `OrderItems`: Orders may contain multiple order items.
-   `Items`: Each item belongs to a category and can be part of an order.
-   `Payments`: Each payment is linked to an order.
-   `Categories`: Items are organized into categories.
-   `User Addresses`: Users can have only one address.

## Setup Instructions 📦

### Prerequisites

Ensure that you have the following installed:

-   Node.js
-   PostgreSQL (or SQLite for local development)

### Install Dependencies

1. Clone the repository:

```bash
    git clone <repository_url>
    cd <repository_folder>
```

2. Install the dependencies:

```bash
    npm install
```

3. Create a `.env` file in the root directory and define the following environment variables:

    ```env
    PORT=3030
    DATABASE_URL=<your_database_url> # for production (PostgreSQL)
    CLIENT_SERVER=<your_frontend_url>
    JWT_SECRET=<your_jwt_secret>
    SECRET_KEY=<your_secret_key> # A secret key for your application
    ```

4. Running the Application
   To start the server, run:

```bash
npm start
```

5. Access the API:
   The API will be available at `http://localhost:3030` by default.
   You can use tools like Postman or Insomnia to test the various API endpoints.

6. Test the endpoints: You can make requests to endpoints such as:

-   `POST /api/users` to register new user and receive a JWT.
-   `POST /api/items` to create new item.
-   `GET /api/orders` to fetch all order.

## Output 📜

The API returns data in JSON format. For example, a successful response when fetching items might look like this:

```json
[
    {
        "id": 1,
        "name": "Product A",
        "category": "Electronics",
        "price": 199.99,
        "description": "A great electronic product"
    },
    {
        "id": 2,
        "name": "Product B",
        "category": "Furniture",
        "price": 99.99,
        "description": "A comfy piece of furniture"
    }
]
```

In case of an error, the response will include a formatted error message:

```json
{
    "error": "Invalid input",
    "message": "Price must be a positive number."
}
```

## Conclusion 🚀

This backend serves as the foundation for an online marketplace, providing essential features such as user management, product management, orders, and payments.
With a modular architecture, the application can be easily extended to accommodate new features as the platform evolves.
It uses industry-standard technologies like JWT for authentication and Sequelize for ORM, ensuring secure, efficient, and scalable operation.

For detailed information about each part of the application (such as specific controllers, routers, and models), refer to the individual files in their respective directories.
