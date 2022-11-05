require("dotenv").config();
const express = require("express");
const cors = require("cors");

// routes
const baseRoutes = require("./routes/base-route");
const app = express();

app.use(express.json());
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

app.listen(process.env.APP_PORT ? process.env.APP_PORT : 3000);
console.log(`server is running on http://localhost:${process.env.APP_PORT ? process.env.APP_PORT : 3000}`)