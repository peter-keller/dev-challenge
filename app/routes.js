module.exports = function(app) {
  const bodyParser = require("body-parser");

  const Product = require("./models/product");

  app
    .use(bodyParser())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json());

  app.get("/", (req, res) => {
    Product.find().distinct("supplierName", (err, supplierNames) => {
      Product.find().distinct("productName", (asd, productNames) => {
        res.render("index", {
          suppliers: supplierNames,
          products: productNames
        });
      });
    });
  });

  app.post("/new-item", (req, res) => {
    Product.create(req.body).then(product => {
      res.send(product);
    });
  });

  app.get("/items", (req, res) => {
    if (req.query.supplierName.length == 0) {
      req.query.supplierName = undefined;
    } else if (req.query.productName.length == 0) {
      req.query.productName = undefined;
    }
    if (
      req.query.supplierName == undefined ||
      req.query.productName == undefined
    ) {
      Product.find(
        {
          $or: [
            { productName: req.query.productName },
            { supplierName: req.query.supplierName }
          ]
        },
        function(err, prod) {
          res.send(prod);
        }
      );
    } else {
      Product.find(
        {
          $and: [
            { productName: req.query.productName },
            { supplierName: req.query.supplierName }
          ]
        },
        function(err, prod) {
          res.send(prod);
        }
      );
    }
  });
};
