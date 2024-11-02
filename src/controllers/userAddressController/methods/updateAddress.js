const UserAddress = require("../../../models/UserAddresses");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Update a user address by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const updateAddress = async (req, res, next) => {
    try {
        const addressId = res.locals.addressId;

        // Validate input to ensure no falsy values
        if (!addressId) {
            throw ApiError.badRequest(
                messages.errors.nullData("Address", "id")
            );
        }

        const { country, city, street, building, apartment, postal } =
            req.body.address;

        // Check for required fields
        containsFalsyValues([country, city, street, building, postal]);

        // Find the existing address
        const addressToUpdate = await findRecordByField(
            "id",
            addressId,
            UserAddress
        );
        if (!addressToUpdate) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Address")
            );
        }

        // Update the address fields, keeping existing values if not provided
        Object.assign(addressToUpdate, {
            country: country || addressToUpdate.country,
            city: city || addressToUpdate.city,
            street: street || addressToUpdate.street,
            building: building || addressToUpdate.building,
            apartment: apartment || addressToUpdate.apartment,
            postal: postal || addressToUpdate.postal,
        });

        // Save the updated address to the database
        await addressToUpdate.save();

        // Log success message
        console.log(messages.success("Address", "updated"));

        res.locals.address = addressToUpdate;
    } catch (e) {
        return next(
            ApiError.badRequest(
                messages.errors.general("updating", "Address", e.message)
            )
        );
    }
};

module.exports = updateAddress;
