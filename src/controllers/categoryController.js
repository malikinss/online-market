const Categorie = require("../models/Categories");
const ApiError = require("../error/ApiError");

class CategorieController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const categorie = await Categorie.create({ name });
            return res.json(categorie);
        } catch (e) {
            throw ApiError.badRequest(e.message);
        }
    }

    async getAll(req, res) {
        try {
            const categories = await Categorie.findAll();
            return res.json(categories);
        } catch (e) {
            throw ApiError.badRequest(e.message);
        }
    }

    async updateById(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
    
            const categorie = await Categorie.findOne({ where: { id } });
    
            if (!categorie) {
                throw ApiError.notFound("Categorie not found");
            }
    
            categorie.name = name || categorie.name;
            await categorie.save();
    
            return res.json(categorie);
        } catch (e) {
            next(e);
        }
    }
    

    async deleteById(req, res) {
        try {
            const { id } = req.params;

            const categorie = await Categorie.findOne({ where: { id } });

            if (!categorie) {
                throw ApiError.notFound("Categorie not found");
            }

            await categorie.destroy();

            return res.json({ message: "Categorie deleted successfully" });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CategorieController();

