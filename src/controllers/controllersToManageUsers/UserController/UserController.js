// Basic CRUDs
const registerUser = require("./methods/registerUser");
const getUser = require("./methods/getUser");
const updateUser = require("./methods/updateUser");
const deleteUser = require("./methods/deleteUser");

// Additional functions
const logInUserHandler = require("./methods/logInUserHandler");
const passwordChanger = require("./methods/passwordChanger");

/**
 * Controller for managing user-related operations.
 */
class UserController {
    /**
     * Registers a new user.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of registerUser function.
     */
    createRecord = registerUser;

    /**
     * Retrieves a specific user record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of getUser function.
     */
    getRecord = getUser;

    /**
     * Updates an existing user record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of updateUser function.
     */
    updateRecord = updateUser;

    /**
     * Deletes a user record.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of deleteUser function.
     */
    deleteRecord = deleteUser;

    /**
     * Handles user login.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of logInUserHandler function.
     */
    logIn = logInUserHandler;

    /**
     * Changes a user's password.
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise} - Resolves to the result of passwordChanger function.
     */
    changePassword = passwordChanger;
}

module.exports = new UserController();
