const UserAddress = require("../../../models/UserAddresses");
const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("./messages");
const ApiError = require("../../../error/ApiError");

/**
 * Get a user address by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getAddress = async (req, res, next) => {
    try {
        const addressId = req.params.id;
        if (!addressId) {
            throw ApiError.badRequest(messages.show.errors.nullId);
        }

        const address = await findRecordByField("id", addressId, UserAddress);
        if (!address) {
            throw ApiError.notFound(messages.show.errors.find);
        }

        console.log(messages.show.success);

        return res.json(address);
    } catch (e) {
        return next(ApiError.internal(messages.show.errors.general(e.message)));
    }
};

module.exports = getAddress;
