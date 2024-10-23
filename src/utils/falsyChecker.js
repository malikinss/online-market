const ApiError = require("../error/ApiError");

const checkForFalsyValues = (values) => {
    if (values.some((field) => !field)) {
        return next(ApiError.badRequest("Некорректные данные для регистрации"));
    }
};

module.exports = checkForFalsyValues;
