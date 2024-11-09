require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const models = require("./models/modelsUtils/relations/relations");
const sequelize = require("./config/dbConnect");
const router = require("./routers/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

const PORT = process.env.PORT || 3030;

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

// middleware обрабатывающий ошибки должен быть в саммом конце!!!
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
