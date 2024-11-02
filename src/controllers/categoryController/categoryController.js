const createCategory = require("./methods/createCategory");
const getCategories = require("./methods/showCategories");
const updateCategory = require("./methods/updateCategory");
const deleteCategory = require("./methods/deleteCategory");

class CategoryController {
    async createRecord(req, res, next) {
        return createCategory(req, res, next);
    }

    async getRecords(req, res, next) {
        return getCategories(req, res, next);
    }

    async updateRecord(req, res, next) {
        return updateCategory(req, res, next);
    }

    async deleteRecord(req, res, next) {
        return deleteCategory(req, res, next);
    }
}

module.exports = new CategoryController();
