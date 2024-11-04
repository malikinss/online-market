const OrderItem = require("../../../models/OrderItems");
const Order = require("../../../models/Orders");
const ApiError = require("../../../error/ApiError");

const { findRecordByField } = require("../../controllerUtils/findHandlers");
const { messages } = require("../../controllerUtils/messagesHandler");

/**
 * Deletes an order item identified by its unique identifier through a database lookup.
 * The operation involves multiple steps: extracting the parameter, validation, existence check, initiating the deletion process, and finalizing with a response.
 * Any deviation from expected behavior or occurrence of exceptions is handled through an error forwarding mechanism.
 * @param {Object} req - The incoming request object containing parameters and other data.
 * @param {Object} res - The response object used to send back the appropriate HTTP response.
 * @param {Function} next - The function to pass control to the next middleware or error handler.
 * @returns {Object} - A JSON object with a success message upon successful deletion.
 * @throws {ApiError} - Throws an error if the ID is missing, the order item is not found, or an unexpected issue occurs during the deletion process.
 */
const deleteOrderItem = async (req, res, next) => {
  try {
    // Extract the order item ID from request parameters
    const orderItemId = req.params.id;
    if (!orderItemId) {
      throw ApiError.badRequest(messages.errors.nullData("OrderItem", "Id"));
    }

    // Find the OrderItem by ID
    const orderItem = await findRecordByField("id", orderItemId, OrderItem);
    if (!orderItem) {
      throw ApiError.notFound(
        messages.errors.actionFailed("find", "OrderItem")
      );
    }

    // Delete the found order item
    await orderItem.destroy();

    // Log success message to the console
    console.log(messages.success("OrderItem", "delete"));

    // Return the success message as a JSON response
    return res.json({ message: messages.success("OrderItem", "delete") });
  } catch (e) {
    next(
      ApiError.internal(
        messages.errors.general("deleting", "OrderItem", e.message)
      )
    );
  }
};

module.exports = deleteOrderItem;
