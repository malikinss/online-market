const User = require("../../../models/Users");
const UserAddress = require("../../../models/UserAddresses");

const { findRecordByField } = require("../../controllerUtils/findHandlers");

const {
  containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const {
  checkEmailAndPhoneUniqueness,
} = require("../../controllerUtils/checkUniqueness");

const ApiError = require("../../../error/ApiError");
const userAdressController = require("../../userAddressController/userAdressController");

/**
 * Updates the user's information.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - JSON containing updated user information.
 */
const userUpdate = async (req, res, next) => {
  try {
    const { email, phone } = req.body;
    const userId = req.user.id; // Get user ID from token

    // Check for required fields
    containsFalsyValues([email, phone]);

    // Find user by ID
    const user = await findRecordByField("id", userId, User);
    if (!user) {
      throw ApiError.badRequest("Failed to find user");
    }

    // Check email and phone uniqueness
    await checkEmailAndPhoneUniqueness(email, phone, User, userId);

    // Update email and phone fields
    user.email = email;
    user.phone = phone;
    await user.save();

    res.locals.addressId = user.addressId;

    await userAdressController.updateRecord(req, res, next);

    await userAdressController.getRecord(req, res, next);
    const address = res.locals.address;

    if (!address) {
      throw ApiError.badRequest("Failed to find userAddress");
    }

    return res.json({ user, address });
  } catch (e) {
    return next(ApiError.badRequest(e.message));
  }
};

module.exports = userUpdate;
