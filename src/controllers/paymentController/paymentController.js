const createPayment = require("./methods/createPayment");
const getPayment = require("./methods/getPayment");
const updatePayment = require("./methods/updatePayment");
const deletePayment = require("./methods/deletePayment");

/**
 * Controller for managing order payments.
 */
class PaymentController {
    async createRecord(req, res, next) {
        createPayment(req, res, next);
    }

    async getRecord(req, res, next) {
        getPayment(req, res, next);
    }

    async updateRecord(req, res, next) {
        updatePayment(req, res, next);
    }

    async deleteRecord(req, res, next) {
        deletePayment(req, res, next);
    }
}

module.exports = new PaymentController();
