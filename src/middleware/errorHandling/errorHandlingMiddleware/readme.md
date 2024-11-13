# Error Handling Middleware 🛠️

## Description 📝

This middleware function is designed for centralized error handling in an Express.js application.
It intercepts errors in the API request cycle, logging them and returning appropriate JSON responses based on the type of error encountered.

## Purpose 🎯

The purpose of this middleware is to streamline error handling across the application by differentiating between expected API errors and unexpected ones, allowing for precise logging and client responses.

## How It Works 🔍

-   The middleware function checks if the incoming `error` is an instance of `ApiError`.
-   **If the error is an `ApiError`:**
    -   Logs the error message for monitoring purposes.
    -   Responds with the specific status code and error message defined in the `ApiError` instance.
-   **If the error is not an `ApiError`:**
    -   Logs the unexpected error details.
    -   Sends a generic `500` status response with an "Unexpected error!" message.

## Output 📜

The middleware function returns a JSON response with the following structure:

-   **For known `ApiError` instances:**
    ```json
    {
      "status": "error",
      "message": "Specific error message from ApiError"
    }
    For unexpected errors:
    {
    "status": "error",
    "message": "Unexpected error!"
    }
    ```

## Usage 📦

1. Ensure that `ApiError` is properly defined and handles application-specific errors.
2. Import this middleware and include it in your Express app setup:

```js
const express = require("express");
const errorMiddleware = require("./path/to/errorMiddleware");

const app = express();

// Place this middleware after all other route handlers
app.use(errorMiddleware);
```

Use `ApiError` within route handlers to trigger controlled errors with custom status codes.

## Conclusion 🚀

This middleware centralizes error handling, improving both debugging capabilities and user feedback by providing structured error responses.
It also allows developers to log and monitor errors effectively, ensuring that only necessary details are exposed to clients.
