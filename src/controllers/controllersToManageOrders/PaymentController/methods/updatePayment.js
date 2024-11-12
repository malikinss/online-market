const Payment = require("../../../../models/Payments/Payments");
const ApiError = require("../../../../error/ApiError");
const Order = require("../../../../models/Orders/Orders");

const {
    findRecordByField,
} = require("../../../controllerUtils/findHandlers/findHandlers");
const {
    messages,
} = require("../../../controllerUtils/messagesHandler/messagesHandler");

/**
 * Update a payment by ID.
 * @param {Object} req - The request object containing payment ID and new status.
 * @param {Object} res - The response object for sending back the updated payment.
 * @param {Function} next - The next middleware function for error handling.
 * @throws {ApiError.notFound} - If the payment is not found.
 * @throws {ApiError.badRequest} - If there is an error with the request.
 */
const updatePayment = async (req, res, next) => {
    try {
        const paymentId = req.params.id;
        if (!paymentId) {
            throw ApiError.internal(messages.errors.nullData("Payment", "ID"));
        }

        const payment = await findRecordByField("id", paymentId, Payment);
        if (!payment) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "Payment")
            );
        }

        // Update the payment status field
        await payment.update({ status: true });

        const order = await findRecordByField("paymentId", paymentId, Order);
        if (!order) {
            throw ApiError.notFound(
                messages.errors.actionFailed("find", "Order")
            );
        }

        // Update the Order status field
        await order.update({ status: "Paid" });

        // Log success message
        console.log(messages.success("Payment", "updated"));

        return res.json(payment);
    } catch (e) {
        next(
            ApiError.internal(
                messages.errors.general("updating", "payment", e.message)
            )
        );
    }
};

module.exports = updatePayment;
