const Cart = require('./../models/Cart.js');
const { transporter } = require("../mailer");
const server = require('express').Router();
const {transporter} = require('../mailer.js')
// SDK de Mercado Pago
const mercadopago = require('mercadopago');

const { ACCESS_TOKEN, FRONT_URL } = process.env;

//Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN
});
//============================================================================//
const mercadoPagoPayment = async(req, res) => {
    const {userId} = req.params;
    const {
        address
    } = req.body;

    //Buscando el Cart Activo por Id de Usuario
    let cart = await Cart.findOne({ $and: [{ userId }, { state: "Active" }] });

    if(!cart) return res.status(404).json({message: 'Cart not found'})

    //Seteando Array de Items del Cart para incluir en preferences
    let items_mp = []
    for (let i = 0; i < cart.items.length; i++) {
        items_mp.push({
            title: cart.items[i].name,
            description: `${cart.items[i].colorName} ${cart.items[i].sizeName}`,
            unit_price: cart.items[i].price,
            quantity: cart.items[i].quantity,
            currency_id: "ARS"
        })
    }

    //Seteando preferencias para Mercado Pago
    let preference = {
        items: items_mp,
        external_reference: `${userId}`,
        payment_methods: {
            excluded_payment_types: [
                {
                    id: "atm"
                }
            ],
            installments: 3  //Cantidad máximo de cuotas
        },
        back_urls: {
            success: `${FRONT_URL}/home/${userId}`,
            failure: `${FRONT_URL}/`,
            pending: `${FRONT_URL}/`,
        }
    };

    const mpResponse = mercadopago.preferences.create(preference);
    
    //Usando los datos que devuelve mpReponse
    ;


    //Actualizando Datos del Cart 
    cart.address = address;
    cart.state = "Paid";
    
    cart.payment.id =  mpResponse.response.id
    cart.payment.link = mpResponse.body.init_point; 
    const updateCart = await cart.save();
    
    //Enviando Mail
    let foo = await transporter.sendMail({
        from: '"Ecommerce" <ecommerceg6ft11@gmail.com>', // sender address
        to: cart.userId.email, // list of receivers
        subject: "The Payment was received", // Subject line
        text: "Thanks for your purchase!", // plain text body
        html: "<b>Hello, your order has been successfully paid. <br/> Your traking code is:  </b>", // html body
    });
}
//============================================================================//
const mercadoPagoRedirect = async(req, res) => {

}

module.exports = {
    mercadoPagoPayment,
    mercadoPagoRedirect
}


// //Ruta que genera la URL de MercadoPago
// server.get("/:userId", async (req, res, next) => {

//   const { userId } = req.params;
//   //const foundCart = await Cart.find({userId},); 
//   const foundCart = await Cart.find({ $and: [{ userId: userId }, { state: "Active" }] })
//   if (!foundCart || foundCart.length == 0) return res.json({ message: "Cart Not Found" });

//   let items_ml = []
//   // return res.json({message:foundCart})
//   for (let i = 0; i < foundCart[0].items.length; i++) {
//     //items_ml.push(foundCart[0].items[i])
//     items_ml.push({
//       title: foundCart[0].items[i].name,
//       description: foundCart[0].items[i].description,
//       unit_price: foundCart[0].items[i].price,
//       quantity: foundCart[0].items[i].quantity,
//       currency_id: "ARS"
//     })
//   }

//   //return res.json(items_ml)
//   //const items_ml = foundCart[0].items.map ((i) => {
//   //  return {title: i.name,
//   //    description: i.description,
//   //    unit_price: i.price,
//   //    quantity: i.quantity,
//   //    currency_id: "ARS"}
//   //})

//   //return res.status(200).json(items_ml)

//   // Crea un objeto de preferencia
//   let preference = {
//     items: items_ml,
//     external_reference: `${userId}`,
//     payment_methods: {
//       excluded_payment_types: [
//         {
//           id: "atm"
//         }
//       ],
//       installments: 3  //Cantidad máximo de cuotas
//     },
//     back_urls: {
//       success: `${FRONT_URL}/home/${userId}`,
//       failure: `${FRONT_URL}/`,
//       pending: `${FRONT_URL}/`,
//     }
//   };

//   // notification_url: "http://localhost:3001/mercadopago/pagos/"

//   mercadopago.preferences.create(preference)

//     .then(function (response) {
//       // console.info('responded')
//       //Este valor reemplazará el string"<%= global.id %>" en tu HTML
//       global.id = response.body.id;
//       // console.log(response.body)
//       res.json({ id: global.id });
//     })
//     .catch(function (error) {
//       // console.log(error);
//     })
// })
//----------------------------------------------------------------------------------------//
// //Ruta que recibe la información del pago
// server.post("/pagos", (req, res) => {

//   // console.info("EN LA RUTA PAGOS ", req)
//   const payment_id = req.query.payment_id
//   const payment_status = req.query.status
//   const external_reference = req.query.external_reference
//   const merchant_order_id = req.query.merchant_order_id
//   // console.log("EXTERNAL REFERENCE ", external_reference)

//   //Aquí edito el status de mi orden
//   Cart.findById(external_reference)
//     .then((cart) => {
//       console.log("PRIMERo")
//       cart.payment_id = payment_id
//       cart.payment_status = payment_status
//       cart.merchant_order_id = merchant_order_id
//       cart.state = "Paid"
//       // console.info('Salvando order')
//       cart.save()
//         .then((_) => {
//           console.info('redirect success')
//           console.log("SEGUNDO")
//           return res.redirect(process.env.FRONT_URL)
//         })
//         .catch((err) => {
//           // console.error('error al salvar', err)
//           return res.redirect(`${process.env.FRONT_URL}/?error=${err}&where=al+salvar`)
//         })
//     })
//     .catch(err => {
//       console.error('error al buscar', err)
//       return res.redirect(`${process.env.FRONT_URL}/?error=${err}&where=al+buscar`)
//     })

//   //proceso los datos del pago 
//   //redirijo de nuevo a react con mensaje de exito, falla o pendiente
// })


// //Busco información de una orden de pago
// server.get("/pagos/:id", (req, res) => {
//   const mp = new mercadopago(ACCESS_TOKEN)
//   const { id } = req.params
//   // console.info("Buscando el id", id)
//   mp.get(`/v1/payments/search`, { 'status': 'pending' }) //{"external_reference":id})
//     .then(resultado => {
//       // console.info('resultado', resultado)
//       res.json({ "resultado": resultado })
//     })
//     .catch(err => {
//       console.error('No se consulto:', err)
//       res.json({
//         error: err
//       })
//     })
// })

// server.get("/cargardatos/:id", (req, res) => {

//   const mp = new mercadopago(ACCESS_TOKEN)
//   const { id } = req.params
//   // console.info("Buscando el id", id)
//   mp.get(`/checkout/preferences/${id}`) //{"external_reference":id})
//     .then(resultado => {
//       // console.info('resultado', resultado)
//       res.json(resultado)
//     })
//     .catch(err => {
//       console.error('No se consulto:', err)
//       res.json({
//         error: err
//       })
//     })
// })

// module.exports = server;