const Categorie = require("../models/Categories");
const ApiError = require("../error/ApiError");

class CategorieController {
    async create(req, res){
        const {name} = req.body;
        const categorie = await Categorie.create({name});
        return res.json(categorie);
    }

    async getAll(req, res){
        const categories = await Categorie.findAll();
        return res.json(categories);
    }

}

module.exports = new CategorieController();
