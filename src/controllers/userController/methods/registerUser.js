const User = require("../../../models/Users");
const ApiError = require("../../../error/ApiError");
const UserAddressController = require("../../userAddressController/userAdressController");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const {
    checkEmailAndPhoneUniqueness,
} = require("../../controllerUtils/checkUniqueness");
const { validateNewPassword } = require("./passwordValidations");
const { messages } = require("../../controllerUtils/messagesHandler");

const bcrypt = require("bcrypt");
const generateJWT = require("../../../utils/generateJWT");

/**
 * Registers a new user.
 * @param {Object} req - Express request object containing user details.
 * @param {Object} res - Express response object used to send a response.
 * @param {Function} next - Express next middleware function for error handling.
 * @returns {Object} - JSON containing the JWT token on successful registration.
 * @throws {ApiError} - Throws ApiError for validation and server errors.
 */
const registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, phone, role } = req.body;

        // Check for required fields
        containsFalsyValues([email, password, firstName, lastName, phone]);

        // Check email and phone uniqueness
        await checkEmailAndPhoneUniqueness(email, phone, User);

        // Check password for compliance
        validateNewPassword(password);

        // Hash the new password and save it
        const salt = await bcrypt.genSalt(10); // Recommended salt rounds
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Create user address
        await UserAddressController.createRecord(req, res, next);
        const createdAddress = res.locals.address;
        if (!createdAddress) {
            throw ApiError.internal(
                messages.errors.actionFailed("create", "address")
            );
        }

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            role: role || "user",
            addressId: createdAddress.dataValues.id,
        });
        if (!user) {
            throw ApiError.internal(
                messages.errors.actionFailed("create", "User")
            );
        }

        // Create JWT token
        const token = generateJWT(user.id, user.email, user.role);

        console.log(messages.success("User", "created"));

        // Return the token in the response
        res.json({ token });
    } catch (e) {
        return next(
            ApiError.internal(
                messages.errors.general("creating", "User", e.message)
            )
        );
    }
};

module.exports = registerUser;
