const User = require("../../../models/Users");
const findByField = require("../../../utils/findByField");
const {
    checkUserUniqueness,
    checkForFalsyValues,
} = require("../../../utils/validationHandling");
const ApiError = require("../../../error/ApiError");

/**
 * Updates the user's information.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - JSON containing updated user information.
 */
const userUpdate = async (req, res, next) => {
    try {
        const { email, phone } = req.body;
        const userId = req.user.id; // Get user ID from token

        // Check for required fields
        checkForFalsyValues([email, phone], next);

        // Find user by ID
        const user = await findByField(userId, User, next);

        // Check email and phone uniqueness
        await checkUserUniqueness(email, phone, userId, next);

        // Update email and phone fields
        user.email = email;
        user.phone = phone;
        await user.save();

        return res.json(user);
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
};

module.exports = userUpdate;
