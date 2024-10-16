const Item = require("./Items");
const Categorie = require("./Categories");
const OrderItem = require("./OrderItems");
// const User = require("./Users")
// const Order = require("./Order");

// User.hasOne(Order);
// Order.belongsTo(User); // корзина принадлежит User

Categorie.hasMany(Item);
Item.belongsTo(Categorie);

Item.hasMany(OrderItem);
OrderItem.belongsTo(Item);

// Order.hasMany(OrderItem);
// OrderItem.belongsTo(Order);

module.exports = { Item, Categorie, OrderItem, };