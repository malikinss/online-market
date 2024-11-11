const User = require("../../../models/Users/Users");
const ApiError = require("../../../error/ApiError");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const { findRecordByField } = require("../../controllerUtils/findHandlers");
const {
    verifyPasswordMatch,
} = require("./passwordValidations/passwordValidations");
const generateJWT = require("../../controllerUtils/generateJWT");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Logs in a user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - JSON containing JWT token.
 * @throws {ApiError} - Throws an ApiError if login fails.
 */
const logInUserHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check for required fields
        containsFalsyValues([email, password]);

        // Find user by email
        const user = await findRecordByField("email", email, User);
        if (!user) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "User")
            );
        }

        // Compare passwords
        await verifyPasswordMatch(password, user.password);

        // Generate JWT token and return it
        const token = generateJWT(user.id, user.email, user.role);

        // Log success message
        console.log(messages.success("User", "logged in"));

        return res.json({ token });
    } catch (e) {
        return next(
            ApiError.internal(
                messages.errors.general("login", "User", e.message)
            )
        );
    }
};

module.exports = logInUserHandler;
