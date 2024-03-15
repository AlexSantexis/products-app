const User = require("../models/user.model");

exports.findAll = async (req, res) => {
  console.log("Find all User products");
  try {
    const result = await User.find({}, { _id: 0, username: 1, products: 1 });
    res.status(200).json({ data: result });
    console.log("Reading all user's products");
  } catch (err) {
    console.log("Error retrieving user's products");
    res.status(400).json({ data: err });
  }
};

exports.findOne = async (req, res) => {
  const username = req.params.username;
  console.log("Find products for user", username);
  try {
    const result = await User.findOne(
      { username: username },
      { _id: 0, username: 1, products: 1 }
    );
    res.status(200).json({ data: result });
    console.log("Success in finding products ", username);
  } catch (err) {
    res.status(400).json({ data: err });
    console.log("Problem in finding products ", username);
  }
};

exports.create = async (req, res) => {
  const username = req.body.username;
  const products = req.body.products;
  console.log("Insert products for user", username);
  try {
    const result = await User.updateOne(
      { username: username },
      {
        $push: {
          products: products,
        },
      }
    );
    res.status(200).json({ data: result });
  } catch (err) {
    console.log("error in inserting product");
    res.status(400).json({ data: err });
  }
};

exports.update = async (req, res) => {
  const username = req.params.username;
  const _id = req.body.product._id;
  const quantity = req.body.product.quantity;

  console.log("update product for username ", username);
  try {
    const result = await User.updateOne(
      { username: username, "products._id": _id },
      {
        $set: {
          "products.$.quantity": quantity,
        },
      }
    );
    res.status(200).json({ data: result });
  } catch (err) {
    console.log("Error updating product");
    res.status(400).json({ data: err });
  }
};

exports.delete = async (req, res) => {
  const username = req.params.username;
  const _id = req.params._id;
  console.log("Delete product from user ", username);
  try {
    const result = await User.deleteOne(
      { username: username },
      {
        $pull: {
          products: { _id: _id },
        },
      }
    );
    res.status(200).json({ data: result });
  } catch (err) {
    console.log("Error deleting product");
    res.status(400).json({ data: err });
  }
};
