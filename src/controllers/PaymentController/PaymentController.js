const createPayment = require("./methods/createPayment");
const getPayment = require("./methods/getPayment");
const updatePayment = require("./methods/updatePayment");
const deletePayment = require("./methods/deletePayment");

/**
 * Controller for managing order payments.
 */
class PaymentController {
  async createRecord(req, res, next) {
    return await createPayment(req, res, next);
  }

  async getRecord(req, res, next) {
    return await getPayment(req, res, next);
  }

  async updateRecord(req, res, next) {
    return await updatePayment(req, res, next);
  }

  async deleteRecord(req, res, next) {
    return await deletePayment(req, res, next);
  }
}

module.exports = new PaymentController();
