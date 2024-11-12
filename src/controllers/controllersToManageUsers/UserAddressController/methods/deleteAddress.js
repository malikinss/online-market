const UserAddress = require("../../../../models/UserAddresses/UserAddresses");
const ApiError = require("../../../../error/ApiError");

const {
    findRecordByField,
} = require("../../../controllerUtils/findHandlers/findHandlers");
const {
    messages,
} = require("../../../controllerUtils/messagesHandler/messagesHandler");

/**
 * Deletes a user address by its ID.
 *
 * @param {Object} req - The request object containing the address ID in `req.params.id`.
 * @param {string} req.params.id - The ID of the address to delete.
 * @param {Object} res - The response object, used to send the deletion success message.
 * @param {Function} next - The next middleware function to handle errors.
 * @returns {void} - This function does not return a value; it sends a response or calls the next middleware.
 * @throws {ApiError} - Throws an `ApiError` if the ID is invalid, the address is not found, or an internal error occurs.
 */
const deleteAddress = async (req, res, next) => {
    try {
        const addressId = res.locals.addressId;
        if (!addressId) {
            throw ApiError.badRequest(
                messages.errors.nullData("Address", "id")
            );
        }

        const addressToDelete = await findRecordByField(
            "id",
            addressId,
            UserAddress
        );

        if (!addressToDelete) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "Address")
            );
        }

        // Destroy the address record from the database
        await addressToDelete.destroy();

        // Log success message
        console.log(messages.success("Address", "deleted"));
    } catch (e) {
        return next(
            ApiError.internal(
                messages.errors.general("deleting", "Address", e.message)
            )
        );
    }
};

module.exports = deleteAddress;
