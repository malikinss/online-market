const User = require("./Users");
const UserAddress = require("./UserAddresses");

const Order = require("./Orders");
const Payment = require("./Payments");
const OrderItem = require("./OrderItems");

const Item = require("./Items");
const Category = require("./Categories");

const initRelations = (sequelize) => {
    User.hasOne(UserAddress);
    UserAddress.belongsTo(User);

    User.hasMany(Order);
    Order.belongsTo(User);

    Order.hasOne(Payment);
    Payment.belongsTo(Order);

    Order.hasMany(OrderItem);
    OrderItem.belongsTo(Order);

    Item.hasMany(OrderItem);
    OrderItem.belongsTo(Item);

    Category.hasMany(Item);
    Item.belongsTo(Category);
};

module.exports = initRelations;
