async function findLastInsertedProduct() {
  console.log("Find last inserted product");

  try {
    // const result = await Product.find({}).sort({ _id: -1 }).limit(1);
    const lastInsertedProduct = await collection.findOne(
      {},
      { sort: { _id: -1 } }
    );
    return lastInsertedProduct[0];
  } catch (err) {
    console.log("Problem in finding product", err);
    return false;
  }
}

module.exports = { findLastInsertedProduct };
