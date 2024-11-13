# Authentication Middleware 🛡️

This middleware function authenticates requests by verifying the JSON Web Token (JWT) provided in the `Authorization` header.
It helps ensure that only authorized users can access protected routes.

## Purpose 🎯

The middleware intercepts incoming requests, checks for a valid JWT token, and verifies it.
If the token is missing or invalid, the request is rejected with a 401 Unauthorized response.
On successful verification, it attaches the decoded token data to the request object, allowing further access to protected resources.

## How It Works 🔍

1. Checks if the request method is `OPTIONS` and skips token verification for it.
2. Extracts the JWT from the `Authorization` header (`Bearer <token>` format).
3. Verifies the token with the secret key provided in the environment variable (`SECRET_KEY`).
4. Attaches the decoded token data to the `req.user` property for use in subsequent route handlers.
5. Handles token-related errors such as expired or invalid tokens, returning specific error messages for better debugging.

## Output 📜

Returns a `401 Unauthorized` response with an appropriate error message if:

-   No token is provided in the `Authorization` header.
-   The token has expired.
-   The token is invalid.

If the token is valid, the request proceeds to the next middleware or route handler.

## Usage 📦

1. Place the middleware in your route definition to protect the route.
2. Ensure the `SECRET_KEY` environment variable is set in your environment for token verification.
3. Import the middleware into your server setup and apply it to routes that require authentication.

Example usage:

```javascript
const authMiddleware = require("./authMiddleware");

// Apply to a protected route
app.get("/protected-route", authMiddleware, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});
```

## Conclusion 🚀

This JWT authentication middleware provides a secure way to protect routes in your Node.js application.
By handling errors specifically for expired or invalid tokens, it makes debugging easier and enhances security for sensitive routes.
