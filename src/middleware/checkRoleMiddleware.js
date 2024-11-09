const jwt = require("jsonwebtoken");

/**
 * Middleware for role-based access control (RBAC) to secure routes.
 * This middleware checks if the incoming request contains a valid JWT,
 * verifies the JWT, and ensures that the user has the appropriate role.
 * If any condition fails, the request is denied with an appropriate status code and message.
 *
 * **Workflow**:
 * 1. It first checks if the method is OPTIONS (for CORS pre-flight). If so, it allows the request to pass without further checks.
 * 2. It looks for a valid Authorization header with the format "Bearer <token>".
 * 3. If no token is found or it's invalid, the request is immediately rejected with a 401 Unauthorized status.
 * 4. The token is then decoded, and the user's role is compared against the required role passed to the middleware.
 * 5. If the role doesn't match, it returns a 403 Forbidden status with a "No access" message.
 * 6. If all checks pass, the user information (decoded token) is added to the `req.user` object, allowing downstream middleware or route handlers to access it.
 *
 * @param {string} role - The role that the user must have in order to access the route.
 *                         The value should correspond to the role field in the decoded JWT (e.g., "admin", "user").
 * @returns {Function} - Returns a middleware function that can be used in the route handler chain.
 *                       This function takes `req`, `res`, and `next` as arguments.
 * @throws {Error} - Will throw an error if `process.env.SECRET_KEY` is undefined or invalid,
 *                   causing JWT verification to fail.
 * @example
 * // Protect the route and require the user to be an "admin"
 * app.get("/admin", checkRole("admin"), (req, res) => {
 *   res.send("Welcome to the admin panel.");
 * });
 */
module.exports = function (role) {
    return function (req, res, next) {
        // Skip OPTIONS requests (CORS pre-flight handling)
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            // Extract token from Authorization header (format: "Bearer <token>")
            const token = req.headers.authorization.split(" ")[1]; // Bearer asfasnfkajsfnjk

            // If no token is found, respond with 401 Unauthorized
            if (!token) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            // Decode and verify the JWT using the SECRET_KEY from the environment
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            // If the decoded role doesn't match the required role, respond with 403 Forbidden
            if (decoded.role !== role) {
                return res.status(403).json({ message: "No access" });
            }

            // Attach the decoded token (user info) to the req object for further use
            req.user = decoded;

            // Proceed to the next middleware or route handler
            next();
        } catch (e) {
            // If any error occurs during the token verification or decoding, reject with Unauthorized status
            res.status(401).json({ message: "Unauthorized" });
        }
    };
};
