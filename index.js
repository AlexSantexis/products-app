const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

app.use(express.json());

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

mongoose.connect(process.env.MONGODB_URI).then(
  () => {
    console.log("Connection to mongodb established");
  },
  (err) => {
    console.log("Failed to connect to mongodb", err);
  }
);

const user = require("./route/user.route");
const userProduct = require("./route/user.product.routes");

app.use("/api/users", user);
app.use("/api/user-products", userProduct);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument.options));

app.listen(port, () => {
  console.log("Server is up");
});
