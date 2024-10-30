const User = require("../../../models/Users");
const UserAddressController = require("../../userAddressController");

const bcrypt = require("bcrypt");
const generateJWT = require("../../../utils/generateJWT");

const ApiError = require("../../../error/ApiError");

const findUserByField = async (fieldValue, fieldName, Model, userId = null) => {
    const excludeSameUser = userId ? { id: { [Op.ne]: userId } } : {};
    return await Model.findOne({
        where: {
            [fieldName]: fieldValue,
            ...excludeSameUser,
        },
    });
};
/**
 * Registers a new user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - JSON containing JWT token.
 */
const userRegistration = async (req, res, next) => {
    try {
        const userData = req.body;
        const { firstName, lastName, email, password, phone, role } = userData;

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
};

module.exports = userRegistration;
