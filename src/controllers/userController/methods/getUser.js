const User = require("../../../models/Users");
const UserAddressController = require("../../userAddressController");

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
        const user = await findByField(userId, User, next);

        // Find userAddress by ID
        const address = await UserAddressController.getAddress(
            user.addressId,
            req,
            res,
            next
        );

        return res.json({ user, address });
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
};

module.exports = getUser;
