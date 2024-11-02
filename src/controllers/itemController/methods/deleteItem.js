const deleteItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await Item.findOne({ where: { id } });

        if (!item) {
            return next(ApiError.notFound("Item not found"));
        }

        await item.destroy();

        return res.json({ message: "Item deleted successfully" });
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
};

module.exports = deleteItem;
