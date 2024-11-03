const Order = require("../../../models/Orders");
const ApiError = require("../../../error/ApiError");
const OrderItemController = require("../../OrderItemController/OrderItemController");
const PaymentController = require("../../PaymentController/PaymentController");

const {
  containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Create a new order.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const createOrder = async (req, res, next) => {
  try {
    const { userId, orderItems } = req.body;

    // Check for falsy values in the order fields
    containsFalsyValues([userId, orderItems]);

    // Create a new Order in the database
    const newOrder = await Order.create({
      userId,
      totalPrice: 0,
      status: "Unpaid",
    });
    if (!newOrder) {
      throw ApiError.internal(messages.errors.actionFailed("create", "Order"));
    }

    res.locals.orderId = newOrder.id;

    // Create OrderItems
    const createdOrderItems = [];
    for (let orderItemData of orderItems) {
      res.locals.orderItemReq = orderItemData;

      // Create a new OrderItem in the database
      await OrderItemController.createRecord(req, res, next);
      let newOrderItem = res.locals.orderItem;

      if (!newOrderItem) {
        throw ApiError.internal(
          messages.errors.actionFailed("create", "OrderItem")
        );
      }

      createdOrderItems.push(newOrderItem);
    }

    // Create a new Payment in the database
    await PaymentController.createRecord(req, res, next);
    const newPaymentId = res.locals.paymentId;

    if (!newPaymentId) {
      throw ApiError.internal(
        messages.errors.actionFailed("create", "Payment")
      );
    }

    // Log success message
    console.log(messages.success("Order", "created"));

    return res.json({
      order: newOrder,
      items: createdOrderItems,
      paymentId: newPaymentId,
    });
  } catch (e) {
    next(
      ApiError.badRequest(
        messages.errors.general("creating", "Order", e.message)
      )
    );
  }
};

module.exports = createOrder;
