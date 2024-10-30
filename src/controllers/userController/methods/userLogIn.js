const User = require("../../../models/Users");

const findByField = require("../../../utils/findByField");
const generateJWT = require("../../../utils/generateJWT");
const {
    checkForFalsyValues,
    validatePassword,
} = require("../../../utils/validationHandling");

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
        checkForFalsyValues([email, password], next);

        // Find user by email
        const user = await findByField(email, User, next);

        // Compare passwords
        await validatePassword(password, user.password);

        // Generate JWT token and return it
        const token = generateJWT(user.id, user.email, user.role);
        return res.json({ token });
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
};

module.exports = userLogIn;
