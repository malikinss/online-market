const bcrypt = require("bcrypt");
const User = require("../../../models/Users");
const ApiError = require("../../../error/ApiError");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const { findRecordByField } = require("../../controllerUtils/findHandlers");
const {
    validateNewPassword,
    verifyPasswordMatch,
} = require("./passwordValidations");

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
        containsFalsyValues([oldPassword, newPassword]);

        // Check password for compliance
        validateNewPassword(newPassword);

        // Find user by ID
        const user = await findRecordByField("id", userId, User);
        if (!user) {
            throw ApiError.badRequest("Failed to find user");
        }

        // Check old password
        await verifyPasswordMatch(oldPassword, user.password);

        // Hash the new password and save it
        const hashedPassword = await bcrypt.hash(newPassword, 5);
        user.password = hashedPassword;
        await user.save();

        return res.json({ message: "Password successfully changed" });
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
};

module.exports = passwordChanger;
