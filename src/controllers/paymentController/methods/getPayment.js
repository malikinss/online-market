const Payment = require("../../../models/Payments");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const { messages } = require("./messages");

/**
 * Get a payment by ID.
 * @param {Object} req - The request object containing payment ID in params.
 * @param {Object} res - The response object for sending back the payment data.
 * @param {Function} next - The next middleware function for error handling.
 * @throws {ApiError.notFound} - If the payment is not found.
 * @throws {ApiError.badRequest} - If the request contains invalid data.
 */
const getPayment = async (req, res, next) => {
    try {
        const paymentID = req.params.id;

        // Check for falsy value in the payment ID
        containsFalsyValues([paymentID]);

        const payment = await findRecordByField("id", id, Payment);
        if (!payment) {
            throw new ApiError.notFound(
                messages.errors.actionFailed("find", "Payment")
            );
        }

        console.log(messages.success("Payment", "founded"));

        return res.json(payment);
    } catch (e) {
        next(
            ApiError.badRequest(messages.errors.general("fetching", e.message))
        );
    }
};

module.exports = getPayment;
