# OrderItem Model 🛒

## Description 📝

The `OrderItem` model defines the schema for items associated with individual orders in the system.
It uses Sequelize ORM to map database records to JavaScript objects, allowing you to manage data related to items within orders, including item quantity, unit price, and total price.

## Purpose 🎯

The `OrderItem` model represents a single item within an order, including references to the specific item, order, and relevant pricing details.
It facilitates tracking and calculation of each item's cost based on quantity and unit price, ensuring accurate total price calculation before saving.

## How It Works 🔍

1. **Database Setup**: Connects to the configured Sequelize instance in `dbConnect`.
2. **Field Definitions**:
    - `id`: Primary key, auto-incremented integer uniquely identifying each order item.
    - `orderId`: Foreign key referencing the `Order` model, linking the item to a specific order.
    - `itemId`: Foreign key referencing the `Item` model, linking to the specific item details.
    - `quantity`: Integer indicating how many of the item are in the order.
    - `unitPrice`: Decimal field storing the price per unit of the item.
    - `totalPrice`: Decimal field, automatically calculated based on `unitPrice * quantity` before saving.
3. **Hooks**:
    - `beforeSave`: Calculates `totalPrice` by multiplying `unitPrice` by `quantity` for each `OrderItem` instance before it is saved to the database.

## Fields 📜

-   **id**: Auto-incremented integer, primary key.
-   **orderId**: Integer, foreign key to the `Order` model, required.
-   **itemId**: Integer, foreign key to the `Item` model, required.
-   **quantity**: Integer representing the number of items in the order.
-   **unitPrice**: Decimal (10, 2), price per unit.
-   **totalPrice**: Decimal (10, 2), total cost for the item, calculated automatically.

## Usage 📦

1. **Import Model**:
    ```javascript
    const OrderItem = require("./models/OrderItems/OrderItems");
    ```
2. **Create an Order Item**:

    ```javascript
    OrderItem.create({
        orderId: 1,
        itemId: 2,
        quantity: 3,
        unitPrice: 10.0,
    })
        .then((orderItem) => console.log("Order item created:", orderItem))
        .catch((error) => console.error("Failed to create order item:", error));
    ```

3. **Update Quantity**:

    ```javascript
    OrderItem.update({ quantity: 5 }, { where: { id: 1 } })
        .then(() => console.log("Order item quantity updated"))
        .catch((error) => console.error("Failed to update quantity:", error));
    ```

4. **Retrieve All Order Items for an Order**:
    ```javascript
    OrderItem.findAll({ where: { orderId: 1 } })
        .then((items) => console.log("Order items:", items))
        .catch((error) =>
            console.error("Failed to retrieve order items:", error)
        );
    ```

## Conclusion 🚀

The OrderItem model is essential for managing item-level details within orders, ensuring accurate calculations and associations with specific items and orders.
The model leverages Sequelize's hooks to automatically compute the total price, supporting efficient data management and minimizing manual calculation errors.
