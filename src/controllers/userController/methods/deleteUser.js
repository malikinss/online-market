const User = require("../../../models/Users");
const UserAddress = require("../../../models/UserAddresses");
const ApiError = require("../../../error/ApiError");
const UserAddressController = require("../../userAddressController/userAdressController");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Deletes a user by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - JSON containing a success message.
 * @throws {ApiError} - Throws an ApiError with a `badRequest` message if the user ID is missing.
 * @throws {ApiError} - Throws an ApiError with a `notFound` message if the user or address is not found.
 * @throws {ApiError} - Throws an ApiError with an `internal` message if a general error occurs during deletion.
 */
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.user.id; // Get user ID from token

        if (!userId) {
            throw ApiError.badRequest(messages.errors.nullData("User", "id"));
        }

        // Find user by ID
        const userToDelete = await findRecordByField("id", userId, User);
        if (!userToDelete) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "User")
            );
        }

        // Find userAddress by ID
        const addressToDelete = await findRecordByField(
            "id",
            userToDelete.addressId,
            UserAddress
        );
        if (!addressToDelete) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "Address")
            );
        }

        // Delete the address
        await UserAddressController.deleteRecord(addressToDelete.id); // TODO: FIX THIS

        // Delete the user
        await userToDelete.destroy();

        // Log success message
        console.log(messages.success("User", "deleted"));

        return res.json({ message: messages.success("User", "deleted") });
    } catch (e) {
        return next(
            ApiError.internal(
                messages.errors.general("deleting", "User", e.message)
            )
        );
    }
};

module.exports = deleteUser;
