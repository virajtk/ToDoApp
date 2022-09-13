const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("../swagger.json");

// Importing Configs
const { mongoUri, port } = require("./configs/configs");

// Importing routes
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

// Import controller for authorization
const authCtrl = require("../server/controllers/auth.controller");

// Initialize
const app = express();

// Config Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.use(helmet());

// Configuring routes
app.use("/api/user", userRoutes.router);
app.use("/api/auth", authRoutes.router);
app.use("/api/task", authCtrl.authenticateToken, taskRoutes.router);

// swagger configs
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Web route
app.get("*", (req, res) => {
    res.status(200).send("To-Do App REST API");
})


// Connecting to Database
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB Connection has established");
    })
    .catch((err) => {
        console.log(`Unable to connect to the DB: ${err}`);
    })

// Starting the Server
app.listen(port, () => {
    console.log(`Server has started on ${port}`);
})
