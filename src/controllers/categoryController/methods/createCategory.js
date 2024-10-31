const Category = require("../../../models/Categories");
const ApiError = require("../../../error/ApiError");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");

const categoryMessages = require("./messages");
/**
 * Creates a new item category in the database.
 * @param {Object} req - Express request object containing the category name in req.body.
 * @param {Object} res - Express response object for sending the result.
 * @param {Function} next - Express middleware function for error handling.
 * @returns {Promise<Object>} JSON object of the created category.
 */
const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        containsFalsyValues([name]);

        const category = await Category.create({ name });

        console.log(categoryMessages.create.success);

        return res.json(category);
    } catch (e) {
        next(
            ApiError.badRequest(categoryMessages.create.generalError(e.message))
        );
    }
};

module.exports = createCategory;
