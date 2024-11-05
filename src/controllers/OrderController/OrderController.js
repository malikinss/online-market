const createOrder = require("./methods/createOrder");
const getOrder = require("./methods/getOrder");
const getOrders = require("./methods/getOrders");
const getOrdersPerUser = require("./methods/getOrdersPerUser");
const updateOrder = require("./methods/updateOrder");
const deleteOrder = require("./methods/deleteOrder");

/**
 * Controller for managing orders.
 */
class OrderController {
    async createRecord(req, res, next) {
        return createOrder(req, res, next);
    }

    async getRecord(req, res, next) {
        return getOrder(req, res, next);
    }

    async getRecords(req, res, next) {
        return getOrders(req, res, next);
    }

    async getRecordsPerUser(req, res, next) {
        return getOrdersPerUser(req, res, next);
    }

    async updateRecord(req, res, next) {
        return updateOrder(req, res, next);
    }

    async deleteRecord(req, res, next) {
        return deleteOrder(req, res, next);
    }
}

module.exports = new OrderController();
