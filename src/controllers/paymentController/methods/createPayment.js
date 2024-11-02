const Payment = require("../../../models/Payments");
const ApiError = require("../../../error/ApiError");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");

const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Create a new order payment.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const createPayment = async (req, res, next) => {
    try {
        const orderID = req.body.id;

        // Check for falsy values in the payment fields
        containsFalsyValues([orderID]);

        // Create a new payment in the database
        const payment = await Payment.create({ orderID, status: false });
        if (!payment) {
            throw new ApiError.internal(
                messages.errors.actionFailed("create", "Payment")
            );
        }

        console.log(messages.success("Payment", "created"));
        return res.json(payment);
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("creating", "payment", e.message)
            )
        );
    }
};

module.exports = createPayment;
