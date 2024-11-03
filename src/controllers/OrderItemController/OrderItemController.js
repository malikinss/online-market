const createOrderItem = require("./methods/createOrderItem");
const getOrderItem = require("./methods/getOrderItem");
const getOrderItems = require("./methods/getOrderItems");
const updateOrderItem = require("./methods/updateOrderItem");
const deleteOrderItem = require("./methods/deleteOrderItem");

/**
 * Controller for managing order items.
 */
class OrderItemController {
    async createRecord(req, res, next) {
        return createOrderItem(req, res, next);
    }

    async getRecord(req, res, next) {
        return getOrderItem(req, res, next);
    }

    async getRecords(req, res, next) {
        return getOrderItems(req, res, next);
    }

    async updateRecord(req, res, next) {
        return updateOrderItem(req, res, next);
    }

    async deleteRecord(req, res, next) {
        return deleteOrderItem(req, res, next);
    }
}

module.exports = new OrderItemController();
