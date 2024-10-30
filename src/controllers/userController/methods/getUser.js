const User = require("../../../models/Users");
const UserAddressController = require("../../userAddressController");

const { findRecordByField } = require("../../controllerUtils/findHandlers");

const ApiError = require("../../../error/ApiError");

/**
 * Retrieves the current user's information.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - JSON containing current user's information.
 */
const getUser = async (req, res, next) => {
    try {
        const userId = req.user.id; // Get user ID from token

        // Find user by ID
        const user = await findRecordByField("id", userId, User);
        if (!user) {
            throw ApiError.badRequest("Failed to find user");
        }

        // Find userAddress by ID
        const address = await UserAddressController.getAddress(req, res, next);
        if (!adress) {
            throw ApiError.badRequest("Failed to find user address");
        }

        return res.json({ user, address });
    } catch (e) {
        return next(ApiError.badRequest(e.message));
    }
};

module.exports = getUser;
