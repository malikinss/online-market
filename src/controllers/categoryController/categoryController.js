const createCategory = require("./methods/createCategory");
const showCategories = require("./methods/showCategories");
const updateCategory = require("./methods/updateCategory");
const deleteCategory = require("./methods/deleteCategory");

class CategoryController {
    async create(req, res, next) {
        return createCategory(req, res, next);
    }

    async getAll(req, res, next) {
        return showCategories(req, res, next);
    }

    async update(req, res, next) {
        return updateCategory(req, res, next);
    }

    async delete(req, res, next) {
        return deleteCategory(req, res, next);
    }
}

module.exports = new CategoryController();
