const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: "Unauthorized: No token provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Attach the decoded token info to the request object

        next(); // Continue to the next middleware or route handler
    } catch (e) {
        // Handle different JWT verification errors with specific messages
        if (e instanceof jwt.TokenExpiredError) {
            return res
                .status(401)
                .json({ message: "Unauthorized: Token has expired" });
        }
        if (e instanceof jwt.JsonWebTokenError) {
            return res
                .status(401)
                .json({ message: "Unauthorized: Invalid token" });
        }

        // Catch all other errors
        return res
            .status(401)
            .json({ message: "Unauthorized: Token verification failed" });
    }
};
