const Category = require("../../../models/Categories");
const ApiError = require("../../../error/ApiError");

const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Creates a new item category and saves it to the database.
 * This function performs validation on the incoming data, handles any potential errors that may occur during the creation process,
 * and logs the outcome for monitoring and debugging purposes.
 * If the category is created successfully, a JSON object of the newly created category is returned.
 * Otherwise, the error is propagated to the error-handling middleware.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object used to send the JSON response.
 * @param {Function} next - Express middleware function for error handling. It is called with an error object
 * if any errors occur during the category creation process.
 *
 * @returns {Promise<Object>} A Promise that resolves to a JSON object representing the created category.
 * The object includes fields such as the category ID and name, as well as any additional metadata
 * added by the database model.
 *
 * @throws {ApiError} If the category name is not provided in the request body, an ApiError with a
 * status code of 400 (Bad Request) is thrown. If the category creation fails due to a database
 * or internal server error, an ApiError with a status code of 500 (Internal Server Error) is thrown.
 * @throws {TypeError} A TypeError might be thrown if an unexpected type is encountered,
 * for example, if the req.body.name is not a string.
 */
const createCategory = async (req, res, next) => {
    try {
        const categoryName = req.body.name;
        if (!categoryName) {
            throw ApiError.badRequest(
                messages.errors.nullData("Category", "name")
            );
        }

        const newCategory = await Category.create({ name: categoryName });
        if (!newCategory) {
            throw ApiError.internal(
                messages.errors.actionFailed("create", "Category")
            );
        }

        // Log success message
        console.log(messages.success("Category", "created"));

        return res.json(newCategory);
    } catch (e) {
        next(
            ApiError.internal(
                messages.errors.general("creating", "Category", e.message)
            )
        );
    }
};

module.exports = createCategory;
