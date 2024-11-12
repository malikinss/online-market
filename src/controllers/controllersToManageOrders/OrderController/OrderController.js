const createOrder = require("./methods/createOrder");
const getOrder = require("./methods/getOrder");
const getOrders = require("./methods/getOrders");
const getOrdersPerUser = require("./methods/getOrdersPerUser");
const updateOrder = require("./methods/updateOrder");
const deleteOrder = require("./methods/deleteOrder");

/**
 * Controller for managing order-related operations.
 */
class OrderController {
    /**
     * Creates a new order record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of createOrder function.
     */
    createRecord = createOrder;

    /**
     * Retrieves a specific order record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of getOrder function.
     */
    getRecord = getOrder;

    /**
     * Retrieves all order records.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of getOrders function.
     */
    getRecords = getOrders;

    /**
     * Retrieves all order records for a specific user.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of getOrdersPerUser function.
     */
    getRecordsPerUser = getOrdersPerUser;

    /**
     * Updates an existing order record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of updateOrder function.
     */
    updateRecord = updateOrder;

    /**
     * Deletes an order record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of deleteOrder function.
     */
    deleteRecord = deleteOrder;
}

module.exports = new OrderController();
