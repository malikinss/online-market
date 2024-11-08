// Import models
const User = require("../../Users/Users");
const UserAddress = require("../../UserAddresses/UserAddresses");

const Order = require("../../Orders/Orders");
const Payment = require("../../Payments/Payments");
const OrderItem = require("../../OrderItems/OrderItems");

const Item = require("../../Items/Items");
const Category = require("../../Categories/Categories");

/**
 * Defines associations between Sequelize models.
 * @param {Object} sequelize - Sequelize connection instance.
 */
const initRelations = (sequelize) => {
    // 1:1 relationship between User and UserAddress
    User.hasOne(UserAddress);
    UserAddress.belongsTo(User);

    // 1:M relationship Between User and Order
    User.hasMany(Order);
    Order.belongsTo(User);

    // 1:1 relationship between Order and Payment
    Order.hasOne(Payment);
    Payment.belongsTo(Order);

    // 1:M relationship between Order and OrderItem
    Order.hasMany(OrderItem);
    OrderItem.belongsTo(Order);

    // 1:M relationship between Item and OrderItem
    Item.hasMany(OrderItem);
    OrderItem.belongsTo(Item);

    // 1:M relationship between Category and Item
    Category.hasMany(Item);
    Item.belongsTo(Category);
};

module.exports = initRelations;
