// Basic CRUDs
const registerUser = require("./methods/registerUser");
const getUser = require("./methods/getUser");
const updateUser = require("./methods/updateUser");
const deleteUser = require("./methods/deleteUser");

// Additional funcs
const logInUserHandler = require("./methods/logInUserHandler");
const passwordChanger = require("./methods/passwordChanger");

/**
 * Controller for managing users.
 */
class UserController {
    async createRecord(req, res, next) {
        return registerUser(req, res, next);
    }

    async getRecord(req, res, next) {
        return getUser(req, res, next);
    }

    async updateRecord(req, res, next) {
        return updateUser(req, res, next);
    }

    async deleteRecord(req, res, next) {
        return deleteUser(req, res, next);
    }

    async logIn(req, res, next) {
        return logInUserHandler(req, res, next);
    }

    async changePassword(req, res, next) {
        return passwordChanger(req, res, next);
    }
}

module.exports = new UserController();
