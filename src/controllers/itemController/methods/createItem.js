const Item = require("../../../models/Items");
const ApiError = require("../../../error/ApiError");

const {
    containsFalsyValues,
} = require("../../controllerUtils/dataValidations");
const { messages } = require("../../controllerUtils/messagesHandler");

const uuid = require("uuid");
const path = require("path");

/**
 * Creates a new item in the database.
 *
 * This function handles the creation of a new item by validating
 * input data, processing an uploaded image file, and storing the
 * item details in the database. If any validation or database
 * operation fails, an appropriate error is thrown.
 *
 * @param {Object} req - The request object containing item details and image file.
 * @param {Object} res - The response object used to send the response back to the client.
 * @param {Function} next - The next middleware function for error handling.
 * @throws {ApiError} Throws an error if validation fails or if item creation fails.
 * @returns {Promise<void>} A promise that resolves when the item is successfully created.
 */

const createItem = async (req, res, next) => {
    try {
        // Destructure item details and image file from request
        const { name, description, price, stock, categoryId } = req.body;
        const { imageFile } = req.files;

        // Validate input to ensure no falsy values
        containsFalsyValues([name, description, price, stock, categoryId]);
        if (!imageFile) {
            throw ApiError.badRequest(
                messages.errors.nullData("Item", "image")
            );
        }

        // Generate a unique filename for the image using UUID
        const fileName = `${uuid.v4()}.jpg`;

        // Move the uploaded image to the static folder
        imageFile.mv(path.resolve(__dirname, "..", "static", fileName));

        // Create a new item in the database
        const newItem = await Item.create({
            name,
            description,
            price,
            stock,
            categoryId,
            img: fileName,
        });

        // Check if item creation was successful
        if (!newItem) {
            throw new ApiError.internal(
                messages.errors.actionFailed("create", "Item")
            );
        }

        // Log a success message to the console
        console.log(messages.success("Item", "created"));

        // Send the newly created item as a response
        return res.json(newItem);
    } catch (e) {
        next(
            ApiError.badRequest(
                messages.errors.general("creating", "Item", e.message)
            )
        );
    }
};

module.exports = createItem;
