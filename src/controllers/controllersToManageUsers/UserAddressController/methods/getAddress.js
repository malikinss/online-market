const UserAddress = require("../../../../models/UserAddresses/UserAddresses");
const ApiError = require("../../../../middleware/errorHandling/ApiError/ApiError");

const {
    findRecordByField,
} = require("../../../controllerUtils/findHandlers/findHandlers");
const {
    messages,
} = require("../../../controllerUtils/messagesHandler/messagesHandler");

/**
 * Get a user address by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getAddress = async (req, res, next) => {
    try {
        const addressId = res.locals.addressId;

        // Validate input to ensure no falsy values
        if (!addressId) {
            throw ApiError.badRequest(
                messages.errors.nullData("Address", "id")
            );
        }

        const address = await findRecordByField("id", addressId, UserAddress);
        if (!address) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Address")
            );
        }

        // Log success message
        console.log(messages.success("Address", "fetched"));

        res.locals.address = address;
    } catch (e) {
        return next(
            ApiError.internal(
                messages.general("fetching", "Address", e.message)
            )
        );
    }
};

module.exports = getAddress;
