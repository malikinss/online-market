const getItem = async (req, res, next) => {
    const { id } = req.params;
    const item = await Item.findOne({ where: { id } });

    if (!item) {
        return next(ApiError.notFound("Item not found"));
    }

    return res.json(item);
};

module.exports = getItem;
