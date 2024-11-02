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

        // Password hashing
        const hashedPassword = await bcrypt.hash(password, 5);
        if (!hashedPassword) {
            throw ApiError.badRequest(
                messages.errors.actionFailed("hash", "password")
            );
        }

        // Create user address
        await UserAddressController.createRecord(req, res, next);
        const createdAddress = res.locals.address;
        if (!createdAddress) {
            throw ApiError.badRequest(
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
            throw ApiError.badRequest(
                messages.errors.actionFailed("create", "User")
            );
        }

        // Create JWT token
        const token = generateJWT(user.id, user.email, user.role);
        if (!token) {
            throw ApiError.badRequest(
                messages.errors.actionFailed("create", "token")
            );
        }

        console.log(messages.success("User", "created"));
        // Return the token in the response
        res.json({ token });
    } catch (e) {
        return next(
            ApiError.internal(messages.general("creating", "User", e.message))
        );
    }
};

module.exports = registerUser;