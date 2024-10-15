const sequelize = require("../config/dbConnect");
const {DataTypes} = require("sequelize");

const Categorie = sequelize.define('categorie', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

module.exports = Categorie;