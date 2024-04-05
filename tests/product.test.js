const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const helper = require("../helpers/product.helper");
require("dotenv").config();
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI).then(
    () => {
      console.log("Connection to mongoDB established");
    },
    (err) => {
      console.log("failed to connect to mongoDB", err);
    }
  );
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Request GET /api/products", () => {
  it("Returns all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

describe("Request GET /api/products/:product", () => {
  it("Returns a product", async () => {
    const result = await helper.findLastInsertedProduct();
    const res = await request(app).get("/api/products/" + result.product);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.product).toBe(result.product);
    expect(res.body.data.cost).toBe(result.cost);
  }, 10000);
});

describe("Request POST /api/products", () => {
  it("Creates a product", async () => {
    const result = await request(app).post("/api/products").send({
      product: "test",
      cost: "10",
      description: "a testing product",
      quantity: "2",
    });
    expect(result.statusCode).toBe(200);
    expect(result.body.data).toBeTruthy();
  }, 10000);
});

describe("Delete /api/products/:product", () => {
  it("Deletes the last inserted product", async () => {
    const result = await helper.findLastInsertedProduct();
    const res = await request(app).delete("/api/products/" + result.product);
    expect(res.statusCode).toBe(200);
  }, 10000);
});
