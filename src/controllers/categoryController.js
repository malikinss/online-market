const Category = require("../models/Categories");
const ApiError = require("../error/ApiError");

class CategoryController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const category = await Category.create({ name });
            return res.json(category);
        } catch (e) {
            throw ApiError.badRequest(e.message);
        }
    }

    async getAll(req, res) {
        try {
            const categories = await Category.findAll();
            return res.json(categories);
        } catch (e) {
            throw ApiError.badRequest(e.message);
        }
    }

    async updateById(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
    
            const category = await Category.findOne({ where: { id } });
    
            if (!categorie) {
                throw ApiError.notFound("Categorie not found");
            }
    
            category.name = name || category.name;
            await category.save();
    
            return res.json(category);
        } catch (e) {
            next(e);
        }
    }
    

    async deleteById(req, res) {
        try {
            const { id } = req.params;

            const category = await Categorie.findOne({ where: { id } });

            if (!category) {
                throw ApiError.notFound("Category not found");
            }

            await category.destroy();

            return res.json({ message: "Category deleted successfully" });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CategoryController();

