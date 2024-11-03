/**
 * Update an order by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const updateOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { status, totalPrice } = req.body;

        // Check for falsy values in the payment fields
        checkForFalsyValues([status, totalPrice], next);

        const order = await findByField(id, Order, next);

        // Update the order fields, keeping existing values if not provided
        Object.assign(order, {
            status: status || order.status,
            totalPrice: totalPrice || order.totalPrice,
        });

        // Save the updated order to the database
        await order.save();

        return res.json(order);
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
};

module.exports = updateOrder;
