const { Sequelize } = require("sequelize");

// Create and export a Sequelize instance to connect to the database
module.exports = new Sequelize({
    dialect: "sqlite", // Specify the dialect used (SQLite)
    storage: "../onlineMarket.db", // Path to the database file
    logging: false, // Disable request logging, to enable set true
});
