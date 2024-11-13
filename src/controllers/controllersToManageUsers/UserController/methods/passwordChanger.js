const bcrypt = require("bcrypt");
const User = require("../../../../models/Users/Users");
const ApiError = require("../../../../middleware/errorHandling/ApiError/ApiError");

const {
    containsFalsyValues,
} = require("../../../controllerUtils/validations/dataValidation/dataValidations");
const {
    findRecordByField,
} = require("../../../controllerUtils/findHandlers/findHandlers");
const {
    validateNewPassword,
    verifyPasswordMatch,
} = require("./passwordValidations/passwordValidations");
const {
    messages,
} = require("../../../controllerUtils/messagesHandler/messagesHandler");

/**
 * Changes the user's password.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - JSON containing success message.
 * @throws {ApiError} - Throws an ApiError if password change fails.
 */
const passwordChanger = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;

        // Check for required fields
        containsFalsyValues([oldPassword, newPassword]);

        const userId = req.user.id; // Get user ID from token
        if (!userId) {
            throw ApiError.badRequest(messages.errors.nullData("User", "id"));
        }

        // Check password for compliance
        validateNewPassword(newPassword);

        // Find user by ID
        const user = await findRecordByField("id", userId, User);
        if (!user) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "User")
            );
        }

        // Check old password
        await verifyPasswordMatch(oldPassword, user.password);

        // Hash the new password
        const salt = await bcrypt.genSalt(10); // Recommended salt rounds
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Save the new hashed password
        user.password = hashedPassword;
        await user.save();

        // Log success message
        console.log(messages.success("password", "updated"));

        return res.json({ message: messages.success("password", "updated") });
    } catch (e) {
        return next(
            ApiError.internal(
                messages.errors.general("updating", "password", e.message)
            )
        );
    }
};

module.exports = passwordChanger;
