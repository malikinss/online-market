const User = require("../../../models/Users");

const bcrypt = require("bcrypt");

const findByField = require("../../../utils/findByField");

const {
    checkForFalsyValues,
    validatePassword,
} = require("../../../utils/validationHandling");

const ApiError = require("../../../error/ApiError");

/**
 * Changes the user's password.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - JSON containing success message.
 */
const passwordChanger = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id; // Get user ID from token

        // Check for required fields
        checkForFalsyValues([oldPassword, newPassword], next);

        // Find user by ID
        const user = await findByField(userId, User, next);

        // Check old password
        await validatePassword(oldPassword, user.password);

        // Hash the new password and save it
        user.password = await bcrypt.hash(newPassword, 5);
        await user.save();

        return res.json({ message: "Password successfully changed" });
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
};

module.exports = passwordChanger;
