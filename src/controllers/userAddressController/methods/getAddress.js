const UserAddress = require("../../../models/UserAddresses");
const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { addressMessages  } = require("./messages");
const ApiError = require("../../../error/ApiError");

/**
 * Get a user address by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getAddress = async (req, res, next) => {
    try {
        const addressId =  res.locals.addressId;
        if (!addressId) {
            throw ApiError.badRequest(addressMessages.show.errors.nullId);
        }

        const address = await findRecordByField("id", addressId, UserAddress);

        if (!address) {
            throw ApiError.notFound(addressMessages.show.errors.find);
        }

        console.log(addressMessages.show.success);

        res.locals.address = address;
    } catch (e) {
        return next(ApiError.internal(addressMessages.show.errors.general(e.message)));
    }
};

module.exports = getAddress;
