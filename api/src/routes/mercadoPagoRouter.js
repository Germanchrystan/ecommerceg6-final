const server = require("express").Router();
const Cart = require('./../models/Cart')
const {
  mercadoPagoPayment,
  
} = require("./../controllers/mercadoPagoController")
// ------------------- ROUTES ------------------

server.post('/:userId', mercadoPagoPayment);



//----------------------------------------------------------------------------------------//
//Ruta que recibe la información del pago
server.post("/pagos", (req, res) => {
  // console.info("EN LA RUTA PAGOS ", req)
  const payment_id = req.query.payment_id
  const payment_status = req.query.status
  const external_reference = req.query.external_reference
  const merchant_order_id = req.query.merchant_order_id
  // console.log("EXTERNAL REFERENCE ", external_reference)

  //Aquí edito el status de mi orden
  Cart.findById(external_reference)
    .then((cart) => {
      console.log("PRIMERo")
      cart.payment_id = payment_id
      cart.payment_status = payment_status
      cart.merchant_order_id = merchant_order_id
      cart.state = "Paid"
      // console.info('Salvando order')
      cart.save()
        .then((_) => {
          console.info('redirect success')
          console.log("SEGUNDO")
          return res.redirect(process.env.FRONT_URL)
        })
        .catch((err) => {
          // console.error('error al salvar', err)
          return res.redirect(`${process.env.FRONT_URL}/?error=${err}&where=al+salvar`)
        })
    })
    .catch(err => {
      console.error('error al buscar', err)
      return res.redirect(`${process.env.FRONT_URL}/?error=${err}&where=al+buscar`)
    })

  //proceso los datos del pago 
  //redirijo de nuevo a react con mensaje de exito, falla o pendiente
})


//Busco información de una orden de pago
server.get("/pagos/:id", (req, res) => {
  const mp = new mercadopago(ACCESS_TOKEN)
  const { id } = req.params
  // console.info("Buscando el id", id)
  mp.get(`/v1/payments/search`, { 'status': 'pending' }) //{"external_reference":id})
    .then(resultado => {
      // console.info('resultado', resultado)
      res.json({ "resultado": resultado })
    })
    .catch(err => {
      console.error('No se consulto:', err)
      res.json({
        error: err
      })
    })
})

server.get("/cargardatos/:id", (req, res) => {
  const mp = new mercadopago(ACCESS_TOKEN)
  const { id } = req.params
  // console.info("Buscando el id", id)
  mp.get(`/checkout/preferences/${id}`) //{"external_reference":id})
    .then(resultado => {
      // console.info('resultado', resultado)
      res.json(resultado)
    })
    .catch(err => {
      console.error('No se consulto:', err)
      res.json({
        error: err
      })
    })
})



module.exports = server;