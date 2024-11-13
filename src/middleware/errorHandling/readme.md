# Error Handling Module in `errorHandling` 📜

## Description 📝

The `errorHandling` module provides a robust error management solution for Express.js applications.
It consists of two main components:

1. **ApiError Class**: A custom error handler designed to represent API errors with specific HTTP status codes and messages.
2. **Error Handling Middleware**: A centralized middleware function that intercepts errors, logs them, and sends appropriate JSON responses to clients.

Together, these components offer a streamlined and consistent way to handle both expected and unexpected errors across the application.

## Purpose 🎯

The purpose of this module is to simplify and unify error handling in API development.
By using `ApiError` for known errors and the error-handling middleware to catch all errors in the request cycle, it enables detailed logging and structured error responses, enhancing both the debugging process and client feedback.

## Components 🔍

### 1. ApiError Class

The `ApiError` class is a custom error class that extends JavaScript’s built-in `Error` class, providing additional functionality for API-specific errors.

-   **Properties**:

    -   `status`: The HTTP status code (e.g., 400, 403, 404, 500).
    -   `message`: A description of the error.

-   **Static Methods**:
    -   `badRequest(message)`: Creates a `400 Bad Request` error.
    -   `internal(message)`: Creates a `500 Internal Server Error`.
    -   `forbidden(message)`: Creates a `403 Forbidden` error.
    -   `notFound(message)`: Creates a `404 Not Found` error.

Example:

```js
const error = ApiError.notFound("Resource not found");
console.log(error.status); // 404
console.log(error.message); // "Resource not found"
```

### 2. Error Handling Middleware

The error-handling middleware is a centralized function for managing errors within the Express.js request-response cycle.

-   **Functionality**:
-             If the error is an ApiError instance, it logs the error and sends a JSON response with the specific status and message.
-             For other (unexpected) errors, it logs the details and sends a generic 500 status with an "Unexpected error!" message.

-   **Response Structure**:

-             For `ApiError` instances:

    ```js
    {
    "status": "error",
    "message": "Specific error message from ApiError"
    }
    ```

-           For unexpected errors:
    ```js
    {
    "status": "error",
    "message": "Unexpected error!"
    }
    ```

## Usage 📦

1. **ApiError Class**:

-   Import and use `ApiError` in your route handlers to trigger controlled errors.
-   Example:
    ```js
    const ApiError = require("./errorHandling/ApiError");
    if (!user) {
        throw ApiError.notFound("User not found");
    }
    ```

2. **Error Handling Middleware**:

-   Import the middleware and include it after all route handlers in your Express app:
    ```js
    const errorMiddleware = require("./errorHandling/errorHandlingMiddleware");
    app.use(errorMiddleware);
    ```

## Conclusion 🚀

The errorHandling module provides a consistent, efficient, and structured way to manage errors in an Express application.
By leveraging ApiError for specific API errors and the middleware for centralized error handling, this module enhances both developer experience and client feedback, making error management simpler and more effective.
