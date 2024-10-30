const UserAddress = require("../../../models/UserAddresses");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const {
  containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const { addressMessages } = require("./messages");

const ApiError = require("../../../error/ApiError");

/**
 * Update a user address by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const updateAddress = async (req, res, next) => {
  try {
    const addressId = res.locals.addressId;
    if (!addressId) {
      throw ApiError.badRequest(addressMessages.update.errors.nullId);
    }

    const { country, city, street, building, apartment, postal } =
      req.body.address;

    // Check for required fields
    containsFalsyValues([country, city, street, building, postal]);
    console.log("gfhgf!!!");
    // Find the existing address
    const address = await findRecordByField("id", addressId, UserAddress);
    if (!address) {
      throw ApiError.notFound(addressMessages.update.errors.find);
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

    console.log(addressMessages.update.success);

    res.locals.address = address;
  } catch (e) {
    return next(
      ApiError.internal(addressMessages.update.errors.general(e.message))
    );
  }
};

module.exports = updateAddress;
