const User = require("../../../models/Users");
const UserAddressController = require("../../userAddressController");
const findByField = require("../../../utils/findByField");
const ApiError = require("../../../error/ApiError");

/**
 * Deletes a user by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - JSON containing a success message.
 */
const userDelete = async (req, res, next) => {
    try {
        const userId = req.user.id; // Get user ID from token

        // Find user by ID
        const user = await findByField(userId, User, next);

        // Find userAddress by ID
        const address = await findByField(user.addressId, UserAddress, next);

        // Delete the address
        await UserAddressController.deleteById(address.id);

        // Delete the user
        await user.destroy();

        return res.json({ message: "User successfully deleted" });
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
};

module.exports = userDelete;
