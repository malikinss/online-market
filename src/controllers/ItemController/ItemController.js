const createItem = require("./methods/createItem");
const getItem = require("./methods/getItem");
const getItems = require("./methods/getItems");
const updateItem = require("./methods/updateItem");
const deleteItem = require("./methods/deleteItem");

/**
 * Controller for handling item-related operations.
 */
class ItemController {
    /**
     * Creates a new item record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of createItem function.
     */
    createRecord = createItem;

    /**
     * Retrieves all item records.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of getItems function.
     */
    getRecords = getItems;

    /**
     * Retrieves a specific item record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of getItem function.
     */
    getRecord = getItem;

    /**
     * Updates an existing item record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of updateItem function.
     */
    updateRecord = updateItem;

    /**
     * Deletes an item record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of deleteItem function.
     */
    deleteRecord = deleteItem;
}

module.exports = new ItemController();
