const User = require("../../../models/Users");
const UserAddressController = require("../../userAddressController");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");

const {
    checkEmailAndPhoneUniqueness,
} = require("../../controllerUtils/checkUniqueness");

const { validateNewPassword } = require("./passwordValidations");

const bcrypt = require("bcrypt");
const generateJWT = require("../../../utils/generateJWT");

const ApiError = require("../../../error/ApiError");

/**
 * Registers a new user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - JSON containing JWT token.
 */
const userRegistration = async (req, res, next) => {
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

        // Create user address
        await UserAddressController.create(req, res, next);
        const createdAddress = res.locals.address;
        if (!createdAddress) {
            throw ApiError.badRequest("Failed to create user address");
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
            throw ApiError.badRequest("Failed to create user");
        }

        // Create JWT token
        const token = generateJWT(user.id, user.email, user.role);
        if (!token) {
            throw ApiError.badRequest("Failed to create token");
        }

        // Return the token in the response
        res.status(201).json({ token });
    } catch (e) {
        console.error("Error during registration:", e);
        return next(ApiError.badRequest(e.message));
    }
};

module.exports = userRegistration;
