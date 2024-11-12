const createCategory = require("./methods/createCategory");
const getCategories = require("./methods/getCategories");
const updateCategory = require("./methods/updateCategory");
const deleteCategory = require("./methods/deleteCategory");

/**
 * Controller for handling category-related operations.
 */
class CategoryController {
    /**
     * Creates a new category record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of createCategory function.
     */
    createRecord = createCategory;

    /**
     * Retrieves all category records.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of getCategories function.
     */
    getRecords = getCategories;

    /**
     * Updates an existing category record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of updateCategory function.
     */
    updateRecord = updateCategory;

    /**
     * Deletes a category record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of deleteCategory function.
     */
    deleteRecord = deleteCategory;
}

module.exports = new CategoryController();
