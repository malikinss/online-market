const Category = require("../models/Categories");
const ApiError = require("../error/ApiError");

class CategoryController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const category = await Category.create({ name });
            return res.json(category);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const categories = await Category.findAll();
            return res.json(categories);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async updateById(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const category = await Category.findOne({ where: { id } });

            if (!category) {
                return next(ApiError.notFound("Category not found"));
            }

            category.name = name || category.name;
            await category.save();

            return res.json(category);
        } catch (e) {
            next(e);
        }
    }

    async deleteById(req, res, next) {
        try {
            const { id } = req.params;

            const category = await Category.findOne({ where: { id } });

            if (!category) {
                return next(ApiError.notFound("Category not found"));
            }

            await category.destroy();

            return res.json({ message: "Category deleted successfully" });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CategoryController();
