const server = require("express").Router();
const {
  mercadoPagoPayment,
  mercadoPagoRedirect
} = require("./../controllers/mercadoPagoController")
// ------------------- ROUTES ------------------

server.post('/:userId', mercadoPagoPayment);
server.get('/redirect', mercadoPagoRedirect)


module.exports = server;