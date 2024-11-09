# ApiError Class in `ApiError.js` 📜

## Description 📝

The `ApiError` class is a custom error handler designed to represent API errors with specific HTTP status codes.
It extends the built-in `Error` class and provides additional properties such as `status` for the HTTP error code and `message` for the error description.
The class also includes static methods for generating common API error responses, such as `400 Bad Request`, `403 Forbidden`, `404 Not Found`, and `500 Internal Server Error`.

## Purpose 🎯

This class is useful for handling API errors in a structured and consistent way across your application.
It allows you to create specific errors with relevant HTTP status codes and custom messages, which can be used in API responses to provide meaningful feedback to the client.

## How It Works 🔍

The `ApiError` class provides a constructor that accepts two parameters:

1. `status`: The HTTP status code (e.g., 400, 404, etc.).
2. `message`: A description of the error that occurred.

Additionally, the class provides the following static methods for generating common API errors:

-   `badRequest(message)`: Creates a `400 Bad Request` error.
-   `internal(message)`: Creates a `500 Internal Server Error`.
-   `forbidden(message)`: Creates a `403 Forbidden` error.
-   `notFound(message)`: Creates a `404 Not Found` error.

## Output 📜

The output of using this class is a new instance of `ApiError` with the corresponding HTTP status code and message. For example:

```js
const error = ApiError.notFound("Resource not found");
console.log(error.status); // 404
console.log(error.message); // "Resource not found"
```

## Usage 📦

To use the ApiError class in your application, follow these steps:

1. **Import the class into your JavaScript file**:
    ```js
    const ApiError = require("./error/ApiError");
    ```
2. **Create an error using one of the static methods**:
    ```js
    const error = ApiError.badRequest("Invalid request parameters");
    console.log(error.status); // 400
    console.log(error.message); // "Invalid request parameters"
    ```
3. **Throw the error in your API route or handler**:
    ```js
    if (!user) {
        throw ApiError.notFound("User not found");
    }
    ```

## Conclusion 🚀

The ApiError class simplifies error handling in API development by providing a consistent way to manage and format errors.
It allows you to clearly define the type of error and includes helpful information for debugging or returning to the client.
This class can be extended or modified based on specific project requirements, such as adding more HTTP status codes or custom error handling logic.
