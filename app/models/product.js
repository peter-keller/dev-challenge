const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  supplierName: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

const product = mongoose.model("product", productSchema);

module.exports = product;
