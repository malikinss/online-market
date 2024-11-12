const createOrderItem = require("./methods/createOrderItem");
const getOrderItem = require("./methods/getOrderItem");
const getOrderItems = require("./methods/getOrderItems");
const updateOrderItem = require("./methods/updateOrderItem");
const deleteOrderItem = require("./methods/deleteOrderItem");

/**
 * Controller for managing order item-related operations.
 */
class OrderItemController {
    /**
     * Creates a new order item record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of createOrderItem function.
     */
    createRecord = createOrderItem;

    /**
     * Retrieves a specific order item record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of getOrderItem function.
     */
    getRecord = getOrderItem;

    /**
     * Retrieves all order item records.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of getOrderItems function.
     */
    getRecords = getOrderItems;

    /**
     * Updates an existing order item record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of updateOrderItem function.
     */
    updateRecord = updateOrderItem;

    /**
     * Deletes an order item record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of deleteOrderItem function.
     */
    deleteRecord = deleteOrderItem;
}

module.exports = new OrderItemController();
