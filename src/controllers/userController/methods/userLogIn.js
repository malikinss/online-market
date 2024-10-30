const User = require("../../../models/Users");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { verifyPasswordMatch } = require("./passwordValidations");

const generateJWT = require("../../../utils/generateJWT");

const ApiError = require("../../../error/ApiError");

/**
 * Logs in a user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - JSON containing JWT token.
 */
const userLogIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check for required fields
        containsFalsyValues([email, password]);

        // Find user by email
        const user = await findRecordByField(email, User);
        if (!user) {
            throw ApiError.badRequest("Failed to find user");
        }

        // Compare passwords
        await verifyPasswordMatch(password, user.password);

        // Generate JWT token and return it
        const token = generateJWT(user.id, user.email, user.role);
        if (!token) {
            throw ApiError.badRequest("Failed to create token");
        }

        return res.json({ token });
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
};

module.exports = userLogIn;
