# Role-Based Access Control Middleware for Express 🛡️

## Description 📝

This middleware provides role-based access control (RBAC) for securing routes in an Express application.
It checks for a valid JSON Web Token (JWT) in the request header and ensures the user has the required role to access the route.
If the token is missing, invalid, or the user lacks the necessary role, access is denied with an appropriate HTTP status code and message.

## Purpose 🎯

This RBAC middleware helps protect sensitive routes by restricting access based on user roles.
It's ideal for applications that require role-specific access control, such as admin panels or restricted user areas.

## How It Works 🔍

1. **OPTIONS Check:** For CORS pre-flight requests (HTTP OPTIONS), it allows the request to pass without validation.
2. **Token Extraction:** The middleware checks for a token in the `Authorization` header with the format `Bearer <token>`.
3. **Token Validation:** If a valid token is found, it decodes and verifies it using a secret key from the environment (`process.env.SECRET_KEY`).
4. **Role Verification:** The decoded token's role is compared to the required role. If the role does not match, the request is denied with a `403 Forbidden` response.
5. **User Info in Request:** If the role matches, the user information from the decoded token is attached to `req.user` for use in subsequent middleware or route handlers.
6. **Error Handling:** If any issues occur (e.g., missing or invalid token), a `401 Unauthorized` response is returned.

## Output 📜

-   **401 Unauthorized:** When the token is missing or invalid.
-   **403 Forbidden:** When the user’s role does not match the required role.
-   **User Info in `req.user`:** If the token is valid and the role matches, the user data from the token is added to the request object.

## Usage 📦

1. Install dependencies:

    ```bash
    npm install jsonwebtoken
    ```

2. Import and use the middleware in your routes:

    ```js
    const checkRole = require("./path-to-this-middleware-file");

    // Protect the route, requiring the user to have an "admin" role
    app.get("/admin", checkRole("admin"), (req, res) => {
        res.send("Welcome to the admin panel.");
    });
    ```

3. Set the secret key in your environment variables (`process.env.SECRET_KEY`).

## Example 📂

This example demonstrates using the middleware to restrict access to users with the "admin" role:

    ```js
    app.get("/admin", checkRole("admin"), (req, res) => {
        res.send("Welcome to the admin panel.");
    });
    ```

## Conclusion 🚀

This middleware provides a simple yet effective way to enforce role-based access in your Express application.
By validating JWTs and checking user roles, it helps you secure routes and control access based on user privileges.
