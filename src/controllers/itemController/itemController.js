const createItem = require("./methods/createItem");
const getItem = require("./methods/getItem");
const getItems = require("./methods/getItems");
const updateItem = require("./methods/updateItem");
const deleteItem = require("./methods/deleteItem");

class ItemController {
    async createRecord(req, res, next) {
        return createItem(req, res, next);
    }

    async getAllRecords(req, res, next) {
        return getItems(req, res, next);
    }

    async getRecord(req, res, next) {
        return getItem(req, res, next);
    }

    async updateRecord(req, res, next) {
        return updateItem(req, res, next);
    }

    async deleteRecord(req, res, next) {
        return deleteItem(req, res, next);
    }
}

module.exports = new ItemController();
