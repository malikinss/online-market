const sequelize = require("../config/dbConnect");
const {DataTypes} = require("sequelize");

const OrderItem = sequelize.define('orderItem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

module.exports = OrderItem;