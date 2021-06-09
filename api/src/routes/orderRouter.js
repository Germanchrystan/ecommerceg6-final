const server = require("express").Router();
const { isAuthenticated, isAdmin } = require('./../middlewares/customMiddlewares');

const {
  getAllOrders,
  addOrderNew,
  getOrderById,
  deleteOrder,
  updateProducts
} = require("./../controllers/orderController");

server.get("/", getAllOrders);
server.post("/", addOrderNew);
server.get("/:id", getOrderById);

server.put('/:id', updateProducts);
server.delete("/:id", deleteOrder);

module.exports = server;