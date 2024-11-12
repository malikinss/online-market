const jwt = require("jsonwebtoken");
const ApiError = require("../../../error/ApiError");

/**
 * Creates a JSON Web Token (JWT) for a user.
 *
 * @param {string} id - The user's ID.
 * @param {string} email - The user's email.
 * @param {string} role - The user's role.
 * @returns {string} - The created JWT.
 * @throws {ApiError} - Throws an error if the SECRET_KEY or other required environment variables are not set.
 */
const generateJWT = (id, email, role) => {
    const secretKey = process.env.SECRET_KEY;
    const jwtExpiration = process.env.JWT_EXPIRATION || "24h";

    // Check if the secret key is defined
    if (!secretKey) {
        throw new ApiError.internal(
            "SECRET_KEY is not defined in the environment variables."
        );
    }

    if (!id || !email || !role) {
        throw new ApiError.badRequest(
            "Missing required user data: id, email, or role."
        );
    }

    const userData = { id, email, role };

    // Generate and return the JWT
    try {
        return jwt.sign(userData, secretKey, {
            expiresIn: jwtExpiration, // Expiration is configurable via environment variables
        });
    } catch (error) {
        throw new ApiError.internal("Error occurred while generating JWT.");
    }
};

module.exports = generateJWT;
