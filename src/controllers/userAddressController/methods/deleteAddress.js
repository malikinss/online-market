const UserAddress = require("../../../models/UserAddresses");
const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("./messages");
const ApiError = require("../../../error/ApiError");

/**
 * Delete a user address by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const deleteAddress = async (req, res, next) => {
    try {
        const addressId = req.params.id;
        if (!addressId) {
            throw ApiError.badRequest(messages.delete.errors.nullId);
        }

        const address = await findRecordByField("id", addressId, UserAddress);
        if (!address) {
            throw ApiError.notFound(messages.delete.errors.find);
        }

        // Destroy the address record from the database
        await address.destroy();

        return res.json({ message: messages.delete.success });
    } catch (e) {
        return next(
            ApiError.internal(messages.delete.errors.general(e.message))
        );
    }
};

module.exports = deleteAddress;
