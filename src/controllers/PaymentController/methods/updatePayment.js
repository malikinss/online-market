const Payment = require("../../../models/Payments");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const { messages } = require("../../controllerUtils/messagesHandler");

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
        const paymentID = req.params.id;
        const newStatus = req.body.status;

        // Check for falsy values in the payment fields
        containsFalsyValues([paymentID, newStatus]);

        const payment = await findRecordByField("id", paymentID, Payment);
        if (!payment) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("update", "Payment")
            );
        }

        // Update the payment status field, keeping existing value if not provided
        Object.assign(payment, { status: newStatus || payment.status });

        // Save the updated payment to the database
        await payment.save();

        console.log(messages.success("Payment", "updated"));

        return res.json(payment);
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("updating", "payment", e.message)
            )
        );
    }
};

module.exports = updatePayment;
