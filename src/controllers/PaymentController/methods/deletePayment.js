const Payment = require("../../../models/Payments");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");

const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Delete a payment by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {ApiError} If the ID is invalid or the deletion fails.
 */
const deletePayment = async (req, res, next) => {
    try {
        const paymentID = req.params.id;

        // Validate the ID
        containsFalsyValues([paymentID]);

        // Find the payment record by ID
        const payment = await findRecordByField("id", paymentID, Payment);
        if (!payment) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("delete", "Payment")
            );
        }

        await payment.destroy();

        console.log(messages.success("Payment", "deleted"));

        return res.json({ message: messages.success("Payment", "deleted") });
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("deleting", "payment", e.message)
            )
        );
    }
};

module.exports = deletePayment;
