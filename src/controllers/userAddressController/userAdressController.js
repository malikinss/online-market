const createAddress = require("./methods/createAddress");
const getAddress = require("./methods/getAddress");
const updateAddress = require("./methods/updateAddress");
const deleteAddress = require("./methods/deleteAddress");

/**
 * Controller for managing user addresses.
 */
class UserAddressController {
    async createRecord(req, res, next) {
        return createAddress(req, res, next);
    }

    async getRecord(req, res, next) {
        return getAddress(req, res, next);
    }

    async updateRecord(req, res, next) {
        return updateAddress(req, res, next);
    }

    async deleteRecord(req, res, next) {
        return deleteAddress(req, res, next);
    }
}

module.exports = new UserAddressController();
