const User = require("../../../models/Users");
const ApiError = require("../../../error/ApiError");
const UserAddressController = require("../../UserAddressController/UserAdressController");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Retrieves the current user's information.
 * @param {Object} req - Express request object containing user data from the token.
 * @param {Object} res - Express response object used to send back user information.
 * @param {Function} next - Express next middleware function for error handling.
 * @returns {Object} - JSON containing the current user's information and address.
 * @throws {ApiError} - Throws an ApiError if the user ID is not found or an error occurs while fetching data.
 */

const getUser = async (req, res, next) => {
    try {
        const userId = req.user.id; // Get user ID from token
        if (!userId) {
            throw ApiError.badRequest(messages.errors.nullData("User", "id"));
        }

        // Find user by ID
        const user = await findRecordByField("id", userId, User);
        if (!user) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "User")
            );
        }

        // Find userAddress by ID
        res.locals.addressId = user.addressId;
        await UserAddressController.getRecord(req, res, next);
        const address = res.locals.address;
        if (!address) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Address")
            );
        }

        // Log success message
        console.log(messages.success("User", "founded"));

        return res.json({ user, address });
    } catch (e) {
        return next(
            ApiError.internal(
                messages.errors.general("fetching", "User", e.message)
            )
        );
    }
};

module.exports = getUser;
