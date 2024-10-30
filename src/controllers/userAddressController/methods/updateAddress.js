const UserAddress = require("../../../models/UserAddresses");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const { messages } = require("./messages");

const ApiError = require("../../../error/ApiError");

/**
 * Update a user address by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const updateAddress = async (req, res, next) => {
    try {
        const addressId = req.params.id;
        if (!addressId) {
            throw ApiError.badRequest(messages.update.errors.nullId);
        }

        const { country, city, street, building, apartment, postal } = req.body;

        // Check for required fields
        containsFalsyValues([country, city, street, building, postal]);

        // Find the existing address
        const address = await findRecordByField("id", addressId, UserAddress);
        if (!address) {
            throw ApiError.notFound(messages.update.errors.find);
        }

        // Update the address fields, keeping existing values if not provided
        Object.assign(address, {
            country: country || address.country,
            city: city || address.city,
            street: street || address.street,
            building: building || address.building,
            apartment: apartment || address.apartment,
            postal: postal || address.postal,
        });

        // Save the updated address to the database
        await address.save();

        console.log(messages.update.success);

        return res.json(address);
    } catch (e) {
        return next(
            ApiError.internal(messages.update.errors.general(e.message))
        );
    }
};

module.exports = updateAddress;
