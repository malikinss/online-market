const createAddress = require("./methods/createAddress");
const getAddress = require("./methods/getAddress");
const updateAddress = require("./methods/updateAddress");
const deleteAddress = require("./methods/deleteAddress");

/**
 * Controller for managing user address-related operations.
 */
class UserAddressController {
    /**
     * Creates a new user address record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of createAddress function.
     */
    createRecord = createAddress;

    /**
     * Retrieves a specific user address record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of getAddress function.
     */
    getRecord = getAddress;

    /**
     * Updates an existing user address record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of updateAddress function.
     */
    updateRecord = updateAddress;

    /**
     * Deletes a user address record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of deleteAddress function.
     */
    deleteRecord = deleteAddress;
}

module.exports = new UserAddressController();
