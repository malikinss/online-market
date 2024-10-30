const userRegistration = require("./methods/userRegistration");
const userLogIn = require("./methods/userLogIn");
const getUser = require("./methods/getUser");
const passwordChanger = require("./methods/passwordChanger");
const userUpdate = require("./methods/userUpdate");
const userDelete = require("./methods/userDelete");

/**
 * Controller for managing users.
 */
class UserController {
    async registration(req, res, next) {
        return userRegistration(req, res, next);
    }

    async login(req, res, next) {
        return userLogIn(req, res, next);
    }

    async getCurrentUser(req, res, next) {
        return getUser(req, res, next);
    }

    async changePassword(req, res, next) {
        return passwordChanger(req, res, next);
    }

    async updateUserInfo(req, res, next) {
        return userUpdate(req, res, next);
    }

    async deleteUser(req, res, next) {
        return userDelete(req, res, next);
    }
}

module.exports = new UserController();
