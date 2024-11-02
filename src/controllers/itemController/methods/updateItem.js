const updateItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, categoryId } = req.body;

        const item = await Item.findOne({ where: { id } });

        if (!item) {
            return next(ApiError.notFound("Item not found"));
        }

        item.name = name || item.name;
        item.description = description || item.description;
        item.price = price || item.price;
        item.stock = stock || item.stock;
        item.categoryId = categoryId || item.categoryId;

        await item.save();

        return res.json(item);
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
};

module.exports = updateItem;
