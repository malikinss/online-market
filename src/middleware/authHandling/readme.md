# Auth Handling Middleware 🛡️

The `authHandling` directory provides middleware functions to manage authentication and role-based access control (RBAC) for securing routes in an Express application.
These middlewares work together to ensure that only authorized users with the correct roles can access protected resources.

## Purpose 🎯

The purpose of these middleware functions is twofold:

1. **Authentication Middleware:** Verifies the JSON Web Token (JWT) in incoming requests to authenticate users and grant access to protected routes.
2. **Role-Based Access Control (RBAC) Middleware:** Ensures users have the necessary roles to access specific routes, adding another layer of security to your application.

## How It Works 🔍

### Authentication Middleware

1. **OPTIONS Check:** For HTTP OPTIONS requests (commonly used for CORS), skips JWT verification.
2. **Token Extraction:** Checks the `Authorization` header for a JWT in `Bearer <token>` format.
3. **Token Validation:** Verifies the token using the `SECRET_KEY` environment variable. If valid, it attaches the decoded token data to the `req.user` property for use in the request lifecycle.
4. **Error Handling:** If the token is missing, expired, or invalid, it returns a `401 Unauthorized` response with a specific error message for easier debugging.

### Role-Based Access Control (RBAC) Middleware

1. **OPTIONS Check:** Allows HTTP OPTIONS requests to pass without role validation.
2. **Token Extraction and Validation:** Verifies the JWT token (if valid, continues with role verification).
3. **Role Verification:** Compares the role in the decoded token with the required role for the route. If the role does not match, returns a `403 Forbidden` response.
4. **User Info in Request:** If role requirements are met, attaches the decoded user information to `req.user`.

## Output 📜

-   **Authentication Middleware:**
    -   `401 Unauthorized` when the token is missing, expired, or invalid.
    -   Allows the request to proceed with `req.user` if the token is valid.
-   **RBAC Middleware:**
    -   `401 Unauthorized` if the token is missing or invalid.
    -   `403 Forbidden` if the user lacks the required role.
    -   Proceeds with `req.user` containing user info if the token is valid and role matches.

## Usage 📦

1. **Install Dependencies:**

    ```bash
    npm install jsonwebtoken
    ```

2. **Set the Secret Key:**
   Ensure the `SECRET_KEY` environment variable is set in your environment to enable JWT verification.

3. **Apply the Middleware:**

    ```javascript
    const authMiddleware = require("./auth/authMiddleware");
    const checkRole = require("./checkRole/checkRole");

    // Protect a route with authentication
    app.get("/protected-route", authMiddleware, (req, res) => {
        res.json({ message: "Access granted", user: req.user });
    });

    // Protect a route with role-based access control
    app.get("/admin", authMiddleware, checkRole("admin"), (req, res) => {
        res.send("Welcome to the admin panel.");
    });
    ```

## Conclusion 🚀

The `authHandling` middleware modules provide robust security for your application by implementing authentication and role-based access control.
By ensuring that only authenticated users with appropriate roles can access certain routes, this middleware setup enhances the security and reliability of your Express application.
