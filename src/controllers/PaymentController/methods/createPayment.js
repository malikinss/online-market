const Payment = require("../../../models/Payments");
const ApiError = require("../../../error/ApiError");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Create a new order payment.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const createPayment = async (req, res, next) => {
  try {
    const orderID = req.body.id || res.locals.orderId;
    if (!orderID) {
      throw ApiError.badRequest(messages.errors.nullData("Order", "id"));
    }

    // Create a new payment in the database
    const payment = await Payment.create({ orderID, status: false });
    if (!payment) {
      throw ApiError.internal(
        messages.errors.actionFailed("create", "Payment")
      );
    }
    const paymentId = payment.dataValues.id;
    res.locals.paymentId = paymentId;
    // Log success message
    console.log(messages.success("Payment", "created"));
  } catch (e) {
    next(
      ApiError.badRequest(
        messages.errors.general("creating", "payment", e.message)
      )
    );
  }
};

module.exports = createPayment;
