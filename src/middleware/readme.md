# Middlewares for Express Application 🔐⚙️

The `middlewares` directory contains essential middleware modules to enhance the functionality and security of your Express application.
It includes two primary modules: **Authentication & Role-Based Access Control (RBAC)** and **Error Handling**.

## Purpose 🎯

The purpose of these middleware modules is to provide:

1. **Authentication and RBAC**: To secure routes by ensuring that only authenticated users with the appropriate roles can access protected resources.
2. **Error Handling**: To manage both expected and unexpected errors in a consistent and structured way, enhancing error logging and client responses.

## How It Works 🔍

### 1. Authentication & Role-Based Access Control (RBAC) Middleware 🛡️

-   **Authentication Middleware**: Verifies the JWT in incoming requests to authenticate users and grant access to protected routes.
-   **RBAC Middleware**: Ensures users have the necessary roles to access specific routes, adding an extra layer of security.

#### Authentication Process:

-   **OPTIONS Check**: Skips token validation for HTTP OPTIONS requests (commonly used for CORS).
-   **Token Extraction**: Checks the `Authorization` header for a JWT.
-   **Token Validation**: Verifies the token using a `SECRET_KEY`. If valid, the decoded token is attached to `req.user`.
-   **Error Handling**: Returns `401 Unauthorized` for missing, expired, or invalid tokens.

#### RBAC Process:

-   **Token Validation**: Verifies the JWT and checks the user's role against the required role for the route.
-   **Role Verification**: If the role doesn't match, returns `403 Forbidden`.

### 2. Error Handling Middleware 📜

The `errorHandling` module provides robust error management by using a custom `ApiError` class and a centralized error-handling middleware.

#### ApiError Class:

-   Custom class for API errors with HTTP status codes and messages.
-   Methods include:
    -   `badRequest(message)`: Creates a `400 Bad Request`.
    -   `internal(message)`: Creates a `500 Internal Server Error`.
    -   `forbidden(message)`: Creates a `403 Forbidden` error.
    -   `notFound(message)`: Creates a `404 Not Found` error.

#### Error Handling Middleware:

-   Logs and sends appropriate JSON responses for errors during the request cycle.
-   For `ApiError` instances, sends a structured response with the specific status and message.
-   For unexpected errors, sends a generic `500 Internal Server Error`.

## Output 📜

-   **Authentication Middleware**:

    -   `401 Unauthorized` for missing or invalid tokens.
    -   Grants access to protected routes when token is valid.

-   **RBAC Middleware**:

    -   `401 Unauthorized` for missing or invalid tokens.
    -   `403 Forbidden` for insufficient user roles.
    -   Grants access if the role matches.

-   **Error Handling Middleware**:
    -   Sends a structured error response based on the error type:
        -   For `ApiError`: A detailed JSON response with `status` and `message`.
        -   For unexpected errors: A generic `500 Internal Server Error` response.

## Usage 📦

### 1. Authentication & RBAC Middleware:

1. **Install Dependencies**:

    ```bash
    npm install jsonwebtoken
    ```

2. **Set the Secret Key**:
   Ensure the `SECRET_KEY` environment variable is set for JWT verification.

3. **Apply Middleware**:

    ```javascript
    const authMiddleware = require("./authHandling/authMiddleware");
    const checkRole = require("./authHandling/checkRole");

    // Protect a route with authentication
    app.get("/protected-route", authMiddleware, (req, res) => {
        res.json({ message: "Access granted", user: req.user });
    });

    // Protect a route with role-based access control
    app.get("/admin", authMiddleware, checkRole("admin"), (req, res) => {
        res.send("Welcome to the admin panel.");
    });
    ```

### 2. Error Handling Middleware:

1. **Use ApiError**:

    ```javascript
    const ApiError = require("./errorHandling/ApiError");
    if (!user) {
        throw ApiError.notFound("User not found");
    }
    ```

2. **Add Error Handling Middleware**:
    ```javascript
    const errorMiddleware = require("./errorHandling/errorHandlingMiddleware");
    app.use(errorMiddleware);
    ```

## Conclusion 🚀

The `middlewares` directory provides essential middleware to secure your application and manage errors effectively.
By using **Authentication & RBAC** middleware, you ensure that only authorized users with appropriate roles can access sensitive routes.
With the **Error Handling** middleware, you simplify error management, ensuring structured error responses and efficient debugging.

This setup helps make your Express application both secure and reliable, improving both the developer and user experience.
