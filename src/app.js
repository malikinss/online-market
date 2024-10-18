require("dotenv").config();
const express = require("express");
const cors = require("cors");
const models = require("./models/relations");
const sequelize = require("./config/dbConnect");
const router = require("./routers/index");
const fileUpload = require('express-fileupload');
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static"))); // получаем любой файл из static
app.use(fileUpload({}));
app.use("/api", router);

// middleware обрабатывающий ошибки должен быть в саммом конце!!!
app.use(errorHandler);

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
     } catch (e) {
        console.log(e);
     }
}

start();
