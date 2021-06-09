const server = require("express").Router();
const upload = require('./../libs/storage');


const {
  addProducts,
  getProductsFilter,
  getProducts,
  updateProducts,
  updateStock,
  removeProductStock,
  deleteProducts,
  getProductsById,
  imagaUpaload,
  addDiscount,
  removeDiscount
} = require("../controllers/productController");


server.get("/", getProducts);
server.get("/filters/", getProductsFilter);
server.get("/:id", getProductsById);
server.get("/detail/:id", getProductsById);
server.post("/",upload.array("img"), addProducts);
server.put("/:id",upload.array("img"),updateProducts);
server.put("/stock/:id",updateStock);
server.delete("/:id",deleteProducts);
server.delete("/delete/stock/:id",removeProductStock );
server.get('/image/:name', imagaUpaload);
server.post('/discount/:productId', addDiscount);
server.put('/discount/:productId', removeDiscount);

module.exports = server;
