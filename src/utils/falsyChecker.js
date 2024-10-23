const ApiError = require("../error/ApiError");

const checkForFalsyValues = (values, next) => {
    if (values.some((field) => !field)) {
        return next(
            ApiError.badRequest(
                "Incorrect data for saving: One of the values is missing"
            )
        );
    }
};

module.exports = checkForFalsyValues;
