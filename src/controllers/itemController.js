const Item = require("../models/Items");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const { title } = require("process");

class ItemController {
    async create(req, res, next){
        try {
            const {name, description, price, stock, categorieId} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const item = await Item.create({name, description, price, stock, categorieId, img: fileName});

            return res.json(item);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res){
        let {categorieId} = req.body;
        let items;
        if (!categorieId) {
          items = await Item.findAll();
        }
        if (categorieId) {
          items = await Item.findAll({where: {categorieId}});
        }

        return res.json(items);
    }

    async getOne(req, res){
        const {id} = req.params;
        const item = await Item.findOne({where: {id}})
        return res.json(item);
    }
}

module.exports = new ItemController();

  