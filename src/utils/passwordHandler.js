const bcrypt = require("bcrypt");
const ApiError = require("../error/ApiError");
const { messages } = require("../views/messageHandling");

const validatePassword = async (password, curUserPassword, next) => {
    const isPasswordValid = await bcrypt.compare(password, curUserPassword);
    if (!isPasswordValid) {
        return next(ApiError.internal("Wrong Password"));
    }
};

const validatePasswordCreation = (password, next) => {
    try {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        return regex.test(password);
    } catch (e) {
        console.error(e);
        return next(
            ApiError.badRequest(messages.error.requirements("Password"))
        );
    }
};

const getValidHashedPassword = (password, next) => {
    try {
        const isValidPswd = validatePasswordCreation(password, next);
        if (!isValidPswd) {
            throw ApiError.badRequest("Password is not valid");
        }

        const hashedPassword = bcrypt.hash(password, 5);
        return hashedPassword;
    } catch (e) {
        return next(
            ApiError.badRequest(messages.error.requirements("Password"))
        );
    }
};

module.exports = { getValidHashedPassword };
