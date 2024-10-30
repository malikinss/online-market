const UserAddress = require("../models/UserAddresses");
const ApiError = require("../error/ApiError");

const { checkForFalsyValues } = require("../utils/validationHandling");
const findByField = require("../utils/findByField");

/**
 * Controller for managing user addresses.
 */
class UserAddressController {
    /**
     * Create a new user address.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async create(req, res, next) {
        try {
            const address = req.body.address;

            if (!address) {
                return next(ApiError.badRequest("Address data is required."));
            }

            const { country, city, street, building, apartment, postal } =
                address;

            const isFalsy = checkForFalsyValues(
                [country, city, street, building, postal],
                next
            );

            //console.log("test =", isFalsy);
            if (!isFalsy) {
                return;
            }

            const parsedBuilding = parseInt(building);
            const parsedApartment = parseInt(apartment);
            const parsedPostal = parseInt(postal);

            const notValid =
                isNaN(parsedBuilding) ||
                isNaN(parsedApartment) ||
                isNaN(parsedPostal);

            if (notValid) {
                return next(
                    ApiError.badRequest(
                        "Building, apartment, and postal must be valid numbers."
                    )
                );
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

            res.locals.address = newAddress;
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    /**
     * Get a user address by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async getAddress(req, res, next) {
        try {
            const { id } = req.params; // Extract ID from request parameters
            const address = await findByField(id, UserAddress, next);
            return res.json(address);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    /**
     * Update a user address by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async updateById(req, res, next) {
        try {
            const { id } = req.params; // Extract ID from request parameters
            const { country, city, street, building, apartment, postal } =
                req.body;

            // Find the existing address
            const address = await findByField(id, UserAddress, next);

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

            return res.json(address);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    /**
     * Delete a user address by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    async deleteById(req, res, next) {
        try {
            const { id } = req.params; // Extract ID from request parameters
            const address = await findByField(id, UserAddress, next);

            // Destroy the address record from the database
            await address.destroy();

            return res.json({ message: "Address deleted successfully" });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new UserAddressController();
