const ApiError = require("../error/ApiError");

async function findByField(field, Model) {
    try {
        const element = await Model.findOne({ where: { field } });

        if (!element) {
            throw ApiError.notFound("Element not found");
        }

        return element;
    } catch (error) {
        throw ApiError.internal("An error occurred while fetching the element");
    }
}

module.exports = findByField;
