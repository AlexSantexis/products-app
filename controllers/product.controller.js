const Product = require("../models/product.model");
const logger = require("../logger/logger");

exports.findAll = async (req, res) => {
  console.log("Find all products");
  try {
    const result = await Product.find();
    res.status(200).json({ status: true, data: result });
    logger.debug("Success in reading all products");
    logger.info("Succed in reading all products");
  } catch (err) {
    console.log("Error retrieving products");
  }
};

exports.findOne = async (req, res) => {
  console.log("Find a product");
  const product = req.params.product;
  try {
    const result = await Product.findOne({ product: product });
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(400).json({ data: err });
    console.log(`Error retrieving product, ${product}`);
  }
};

exports.create = async (req, res) => {
  console.log("Insert a product");
  const newProduct = new Product({
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity,
  });
  console.log(newProduct);
  try {
    const result = await newProduct.save();
    res.status(200).json({ data: result });
    console.log("product saved");
  } catch (err) {
    res.status(400).json({ data: err });
    console.log("Problem inserting product");
  }
};

exports.update = async (req, res) => {
  const product = req.params.product;
  console.log("Update product with product name ", product);

  const updateProduct = {
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity,
  };

  try {
    const result = await Product.findOneAndUpdate(
      { product: product },
      updateProduct,
      { new: true }
    );
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(400).json({ data: err });
    console.log("Error updating product ", product);
  }
};

exports.delete = async (req, res) => {
  const product = req.params.product;
  console.log("delete product: ", product);
  try {
    const result = await Product.findOneAndDelete({ product: product });
    res.status(200).json({ data: result });
    console.log("Success in deleting product ", product);
  } catch (err) {
    res.status(400).json({ data: err });
    console.log("Error in deleting product ", product);
  }
};
