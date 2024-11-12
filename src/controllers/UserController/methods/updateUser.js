const User = require("../../../models/Users/Users");
const ApiError = require("../../../error/ApiError");
const UserAddressController = require("../../UserAddressController/UserAddressController");

const {
    findRecordByField,
} = require("../../controllerUtils/findHandlers/findHandlers");
const {
    containsFalsyValues,
} = require("../../controllerUtils/containsFalsyValues/dataValidations");
const {
    checkEmailAndPhoneUniqueness,
} = require("../../controllerUtils/checkUniqueness/checkUniqueness");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Updates the user's information.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - JSON containing updated user information and address.
 * @throws {ApiError} - Throws ApiError on validation or update failures.
 */
const updateUser = async (req, res, next) => {
    try {
        const { email, phone } = req.body;

        // Check for required fields
        containsFalsyValues([email, phone]);

        const userId = req.user.id; // Get user ID from token
        if (!userId) {
            throw ApiError.badRequest(messages.errors.nullData("User", "id"));
        }

        // Check email and phone uniqueness
        await checkEmailAndPhoneUniqueness(email, phone, User, userId);

        // Find user by ID
        const userToUpdate = await findRecordByField("id", userId, User);
        if (!userToUpdate) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "User")
            );
        }

        // Update email and phone fields
        await userToUpdate.update({ email, phone });

        // Handle address update
        res.locals.addressId = userToUpdate.addressId;
        await userAddressController.updateRecord(req, res, next);
        await userAddressController.getRecord(req, res, next);

        const addressToUpdate = res.locals.address;
        if (!addressToUpdate) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Address")
            );
        }

        // Log success message
        console.log(messages.success("User", "updated"));

        return res.json({ userToUpdate, addressToUpdate });
    } catch (e) {
        return next(
            ApiError.badRequest(
                messages.errors.general("updating", "User", e.message)
            )
        );
    }
};

module.exports = updateUser;
