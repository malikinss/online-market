const User = require("../../../models/Users");
const UserAddress = require("../../../models/UserAddresses");
const UserAddressController = require("../../userAddressController");

const { findRecordByField } = require("../../controllerUtils/findHandlers");

const ApiError = require("../../../error/ApiError");

/**
 * Deletes a user by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - JSON containing a success message.
 */
const userDelete = async (req, res, next) => {
    const messages = {
        success: "User successfully deleted",
        error: {
            find: {
                user: "Failed to find user",
                adress: "Failed to find user address",
            },
        },
    };

    try {
        const userId = req.user.id; // Get user ID from token

        // Find user by ID
        const user = await findRecordByField("id", userId, User);
        if (!user) {
            throw ApiError.badRequest(messages.error.find.user);
        }

        // Find userAddress by ID
        const address = await findRecordByField(
            "id",
            user.addressId,
            UserAddress
        );
        if (!address) {
            throw ApiError.badRequest(messages.error.find.adress);
        }

        // Delete the address
        await UserAddressController.deleteById(address.id);

        // Delete the user
        await user.destroy();

        return res.json({ message: messages.success });
    } catch (e) {
        return next(ApiError.badRequest(e.message));
    }
};

module.exports = userDelete;
