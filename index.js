const express = require("express");
const app = express();
// const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

app.use("/", express.static("files"));

mongoose.connect(process.env.MONGODB_URI).then(
  () => {
    console.log("Connection to mongodb established");
  },
  (err) => {
    console.log("Failed to connect to mongodb", err);
  }
);

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:8000/"],
  })
);
const user = require("./route/user.route");
const product = require("./route/product.route");
const userProduct = require("./route/user.product.routes");

app.use("/api/users", user);
app.use("/api/user-products", userProduct);
app.use("/api/products", product);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument.options));

// app.listen(port, () => {
//   console.log("Server is up");
// });

module.exports = app;
