const express = require("express");
const morgan = require("morgan");
const { APP_PORT } = require("./utils/config");
const sequelize = require("./utils/database");
const cors = require("cors");
const { validateAuthorization } = require("./utils/auth-validation");
const fs = require("fs");
const { LOG_BASE_PATH } = require("./utils/config");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = require("./utils/swagger-options.json");

// Importing models to sequelize create tables
const Users = require("./models/user-model");

// routes
const baseRoutes = require("./routes/base-route");
const authRoutes = require("./routes/auth-routes");
const adminRoutes = require("./routes/admin-routes");
const userRoutes = require("./routes/user-routes");
const app = express();

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(LOG_BASE_PATH + "/access.log", {
  flags: "a",
});

const swaggerDocument = swaggerJsDoc(swaggerOptions);

app.use(express.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.options(
  "*",
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(baseRoutes);
app.use(authRoutes);

// api docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("", [validateAuthorization(), userRoutes]);
app.use("/admin", [validateAuthorization("ADMIN"), adminRoutes]);
// { alter: true }
sequelize
  .sync({ alter: true })
  .then((res) => {
    app.listen(APP_PORT ? APP_PORT : 3000);
  })
  .catch((err) => {
    console.error(err);
  });
