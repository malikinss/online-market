const Item = require("../../models/Items");
const ApiError = require("../../error/ApiError");
const uuid = require("uuid");
const path = require("path");

const createItem = async (req, res, next) => {
    try {
        const { name, description, price, stock, categoryId } = req.body;
        const { img } = req.files;

        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));

        const item = await Item.create({
            name,
            description,
            price,
            stock,
            categoryId,
            img: fileName,
        });

        return res.json(item);
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
};

module.exports = createItem;
