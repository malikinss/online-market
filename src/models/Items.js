const sequelize = require("../config/dbConnect");
const {DataTypes} = require("sequelize");

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: true},
    price: {type: DataTypes.INTEGER, allowNull: false},
    stock: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

module.exports = Item;