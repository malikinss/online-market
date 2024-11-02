const UserAddress = require("../../../models/UserAddresses");
const ApiError = require("../../../error/ApiError");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Creates a new user address and saves it to the database.
 * Validates the provided address data, ensuring all required fields are present and properly formatted.
 * Returns the newly created address on success or passes an error to the next middleware on failure.
 *
 * @param {Object} req - The request object containing the user address data in `req.body.address`.
 * @param {Object} req.body.address - The address data to be created.
 * @param {Object} res - The response object, used to store the newly created address in `res.locals.address`.
 * @param {Function} next - The next middleware function to handle errors or continue the request-response cycle.
 * @returns {void} - The function does not return a value; instead, it either sends a response or calls the `next` middleware.
 * @throws {ApiError} - Throws an `ApiError` if the request data is invalid or if there's an error creating the address in the database.
 */
const createAddress = async (req, res, next) => {
    try {
        const addressData = req.body.address;

        if (!addressData) {
            throw ApiError.badRequest(
                messages.errors.nullData("Address", "data")
            );
        }

        const { country, city, street, building, apartment, postal } =
            addressData;

        // Check for required fields
        containsFalsyValues([
            country,
            city,
            street,
            building,
            apartment,
            postal,
        ]);

        const parsedBuilding = parseInt(building);
        const parsedApartment = parseInt(apartment);
        const parsedPostal = parseInt(postal);

        const notValid =
            isNaN(parsedBuilding) ||
            isNaN(parsedApartment) ||
            isNaN(parsedPostal);

        if (notValid) {
            throw ApiError.badRequest(messages.errors.notNumber);
        }

        // Create a new address in the database
        const newAddress = await UserAddress.create({
            country,
            city,
            street,
            building: parsedBuilding,
            apartment: parsedApartment,
            postal: parsedPostal,
        });
        if (!newAddress) {
            throw ApiError.internal(
                messages.errors.actionFailed("create", "Address")
            );
        }

        res.locals.address = newAddress;
        console.log(messages.success("Address", "created"));
    } catch (e) {
        return next(
            ApiError.internal(
                messages.errors.general("creating", "Address", e.message)
            )
        );
    }
};

module.exports = createAddress;
