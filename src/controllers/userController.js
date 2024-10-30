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
    validatePasswordCreation,
} = require("../utils/validationHandling");

const { getValidHashedPassword } = require("../utils/passwordHandler");

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
        const findUserByField = async (
            fieldValue,
            fieldName,
            Model,
            userId = null
        ) => {
            const excludeSameUser = userId ? { id: { [Op.ne]: userId } } : {};
            return await Model.findOne({
                where: {
                    [fieldName]: fieldValue,
                    ...excludeSameUser,
                },
            });
        };
        try {
            const userData = req.body;
            const { firstName, lastName, email, password, phone, role } =
                userData;

            // Check for falsy values
            const values = [email, password, firstName, lastName, phone];
            const hasFalsy = values.some((field) => !field);
            if (hasFalsy) {
                throw ApiError.badRequest("Some data was not privided");
            }

            // Check email and phone uniqueness
            const [existingEmail, existingPhone] = await Promise.all([
                findUserByField(email, "email", User),
                findUserByField(phone, "phone", User),
            ]);
            if (existingEmail || existingPhone) {
                throw ApiError.badRequest(
                    "User with such email or phone already exists"
                );
            }

            // Check if valid password
            const regex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
            const isValidPswd = regex.test(password);

            if (!isValidPswd) {
                throw ApiError.badRequest("Password is not valid");
            }

            const hashedPassword = await bcrypt.hash(password, 5);

            // Create user address
            await UserAddressController.create(req, res, next);
            const createdAddress = res.locals.address;
            if (!createdAddress) {
                throw ApiError.badRequest("Address wasnt created");
            }

            // Create user
            console.log("\nWAS HEADERS SENT = ", res.headersSent, "\n"); // FALSE
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone,
                role: role || "user",
                addressId: createdAddress.dataValues.id,
            });
            console.log("\nWAS HEADERS SENT = ", res.headersSent, "\n"); // TRUE WHYYYYYY??????
            if (!user) {
                throw ApiError.badRequest("User wasnt created");
            }

            // Create JWT token
            const token = generateJWT(user.id, user.email, user.role);
            if (!token) {
                throw ApiError.badRequest("Token wasnt created");
            }

            res.json({ token });
        } catch (e) {
            console.error("Error during registration:", e);
            return next(ApiError.badRequest(e.message));
        }
    }
    // async registration(req, res, next) {
    //     try {
    //         const userData = req.body;
    //         const { firstName, lastName, email, password, phone, role } =
    //             userData;

    //         // Check for falsy values
    //         const isFalsy = checkForFalsyValues(
    //             [email, password, firstName, lastName, phone],
    //             next
    //         );
    //         if (!isFalsy) return; // Early return if any values are falsy

    //         // Check email and phone uniqueness
    //         const isUnique = await checkUserUniqueness(
    //             email,
    //             phone,
    //             User,
    //             next
    //         );
    //         if (!isUnique) return;

    //         const hashedPassword = await getValidHashedPassword(password, next);
    //         if (!hashedPassword) return;

    //         // Create user address
    //         await UserAddressController.create(req, res, next);
    //         const createdAddress = res.locals.address;

    //         console.log(res.headersSent);
    //         // Обработаем создание пользователя с обработкой ошибок
    //         let user;
    //         try {
    //             user = await User.create({
    //                 firstName,
    //                 lastName,
    //                 email,
    //                 password: hashedPassword,
    //                 phone,
    //                 role: role || "user",
    //                 addressId: createdAddress.dataValues.id,
    //             });
    //         } catch (error) {
    //             console.error("Error creating user:", error); // Логируем ошибку
    //             return next(
    //                 ApiError.badRequest("Error creating user: " + error.message)
    //             );
    //         }

    //         console.log(res.headersSent);

    //         if (!user) return next(ApiError.badRequest("User creation failed")); // Handle user creation failure
    //         // Generate JWT token and return it
    //         const token = generateJWT(user.id, user.email, user.role);

    //         res.json({ token }); // Send response
    //     } catch (e) {
    //         console.error("Error during registration:", e);
    //         return next(ApiError.badRequest(e.message));
    //     }
    // }

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
        }
    }

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

module.exports = new UserController();
