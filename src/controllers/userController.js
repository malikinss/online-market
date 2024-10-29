const User = require("../models/Users");
const UserAddress = require("../models/UserAddresses");

const UserAddressController = require("./userAddressController");

const bcrypt = require("bcrypt");
const generateJWT = require("../utils/generateJWT");

const findByField = require("../utils/findByField");
const {
    checkUserUniqueness,
    checkForFalsyValues,
    validatePassword,
} = require("../utils/validationHandling");

const ApiError = require("../error/ApiError");

/**
 * Controller for managing users.
 */
class UserController {
    /**
     * Registers a new user.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} - JSON containing JWT token.
     */
    async registration(req, res, next) {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                phone,
                role,
                address,
            } = req.body;

            // Check for required fields
            checkForFalsyValues(
                [email, password, firstName, lastName, phone, address],
                next
            );

            // Check email and phone uniqueness
            await checkUserUniqueness(email, phone, null, next);

            // Create user address
            const newAddress = await UserAddressController.create(
                req,
                res,
                next
            );

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 5);

            // Create a new user
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone,
                role: role || "user",
                addressId: newAddress.id,
            });

            // Generate JWT token and return it
            const token = generateJWT(user.id, user.email, user.role);
            return res.json({ token });
        } catch (e) {
            next(ApiError.badRequest(e.message));
    }

    /**
     * Logs in a user.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} - JSON containing JWT token.
     */
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // Check for required fields
            checkForFalsyValues([email, password], next);

            // Find user by email
            const user = await findByField(email, User, next);

            // Compare passwords
            await validatePassword(password, user.password);

            // Generate JWT token and return it
            const token = generateJWT(user.id, user.email, user.role);
            return res.json({ token });
        } catch (e) {
            next(ApiError.badRequest(e.message));
    }}

    /**
     * Retrieves the current user's information.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} - JSON containing current user's information.
     */
    async getCurrentUser(req, res, next) {
        try {
            const userId = req.user.id; // Get user ID from token

            // Find user by ID
            const user = await findByField(userId, User, next);

            // Find userAddress by ID
            const address = await UserAddressController.getAddress(
                user.addressId,
                req,
                res,
                next
            );

            return res.json({ user, address });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    /**
     * Changes the user's password.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} - JSON containing success message.
     */
    async changePassword(req, res, next) {
        try {
            const { oldPassword, newPassword } = req.body;
            const userId = req.user.id; // Get user ID from token

            // Check for required fields
            checkForFalsyValues([oldPassword, newPassword], next);

            // Find user by ID
            const user = await findByField(userId, User, next);

            // Check old password
            await validatePassword(oldPassword, user.password);

            // Hash the new password and save it
            user.password = await bcrypt.hash(newPassword, 5);
            await user.save();

            return res.json({ message: "Password successfully changed" });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    /**
     * Updates the user's information.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} - JSON containing updated user information.
     */
    async updateUserInfo(req, res, next) {
        try {
            const { email, phone } = req.body;
            const userId = req.user.id; // Get user ID from token

            // Check for required fields
            checkForFalsyValues([email, phone], next);

            // Find user by ID
            const user = await findByField(userId, User, next);

            // Check email and phone uniqueness
            await checkUserUniqueness(email, phone, userId, next);

            // Update email and phone fields
            user.email = email;
            user.phone = phone;
            await user.save();

            return res.json(user);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    /**
     * Deletes a user by ID.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} - JSON containing a success message.
     */
    async deleteUser(req, res, next) {
        try {
            const userId = req.user.id; // Get user ID from token

            // Find user by ID
            const user = await findByField(userId, User, next);

            // Find userAddress by ID
            const address = await findByField(
                user.addressId,
                UserAddress,
                next
            );

            // Delete the address
            await UserAddressController.deleteById(address.id);

            // Delete the user
            await user.destroy();

            return res.json({ message: "User successfully deleted" });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}
}

module.exports = new UserController();
