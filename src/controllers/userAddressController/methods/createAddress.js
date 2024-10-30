const UserAddress = require("../../../models/UserAddresses");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");

const { addressMessages } = require("./messages");

const ApiError = require("../../../error/ApiError");

/**
 * Create a new user address.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const createAddress = async (req, res, next) => {
    try {
        const address = req.body.address;

        if (!address) {
            throw ApiError.badRequest(addressMessages.create.errors.nullData);
        }

        const { country, city, street, building, apartment, postal } = address;

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
            throw ApiError.badRequest(addressMessages.create.errors.notNumber);
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
            throw ApiError.badRequest(
                addressMessages.create.errors.modelCreation
            );
        }

        res.locals.address = newAddress;
        console.log(addressMessages.create.success);
    } catch (e) {
        return next(
            ApiError.internal(addressMessages.create.errors.general(e.message))
        );
    }
};

module.exports = createAddress;
