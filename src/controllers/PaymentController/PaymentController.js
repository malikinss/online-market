const createPayment = require("./methods/createPayment");
const getPayment = require("./methods/getPayment");
const updatePayment = require("./methods/updatePayment");
const deletePayment = require("./methods/deletePayment");

/**
 * Controller for managing payment-related operations.
 */
class PaymentController {
    /**
     * Creates a new payment record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of createPayment function.
     */
    createRecord = createPayment;

    /**
     * Retrieves a specific payment record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of getPayment function.
     */
    getRecord = getPayment;

    /**
     * Updates an existing payment record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of updatePayment function.
     */
    updateRecord = updatePayment;

    /**
     * Deletes a payment record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of deletePayment function.
     */
    deleteRecord = deletePayment;
}

module.exports = new PaymentController();
