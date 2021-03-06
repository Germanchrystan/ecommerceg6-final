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
  imageUpload,
  addDiscount,
  removeDiscount,
  getRandomDiscount,
  getRandomDiscountByKeyword
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
server.get('/image/:name', imageUpload);

server.post('/discount/:productId', addDiscount);
server.put('/discount/:productId', removeDiscount);

server.get('/discount/random', getRandomDiscount)
server.get('/discount/random/:keyword', getRandomDiscountByKeyword)

module.exports = server;
