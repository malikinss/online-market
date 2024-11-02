const getItems = async (req, res, next) => {
    try {
        const { categoryId } = req.query;
        const whereClause = {};

        if (categoryId) {
            whereClause.categoryId = categoryId;
        }

        const items = await Item.findAll({ where: whereClause });

        return res.json(items);
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
};

module.exports = getItems;
