const Category = require("../../../models/Categories");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const categoryMessages = require("./messages");

/**
 * Updates the name of a category by ID in the database.
 * @param {Object} req - Express request object containing category ID in req.params and new name in req.body.
 * @param {Object} res - Express response object to send the result.
 * @param {Function} next - Express middleware function for error handling.
 * @returns {Promise<Object>} JSON object of the updated category.
 */
const updateCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { newName } = req.body;

        containsFalsyValues([id, newName]);

        const category = await findRecordByField("id", id, Category);

        // Update the category name field, keeping existing value if not provided
        Object.assign(category, { name: newName || category.name });

        await category.save();

        console.log(categoryMessages.update.success);

        return res.json(category);
    } catch (e) {
        next(
            ApiError.badRequest(categoryMessages.update.generalError(e.message))
        );
    }
};

module.exports = updateCategory;
