const Cart = require('./../models/Cart.js');
const { transporter } = require("../mailer");
const server = require('express').Router();

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
            success: `${FRONT_URL}/`,
            failure: `${FRONT_URL}/`,
            pending: `${FRONT_URL}/`,
        }
    };

    mercadopago.preferences.create(preference)
    .then(async(response) => {
        
        //Este valor reemplazará el string"<%= global.id %>" en tu HTML
        global.id = response.body.id;
        global.link = response.body.init_point;
        //Actualizando Datos del Cart 
        cart.payment.id = global.id;
        cart.payment.link =global.link; 
        cart.address = address;
        const updateCart = await cart.save();

        return res.json({ id: global.id, updateCart, link: global.link });
    })
    .catch(function (error) {
        console.log(error);
    })
    //---------------------------------------------------------//
}
//============================================================================//
const mercadoPagoRedirect = async(req, res) => {

}

module.exports = {
    mercadoPagoPayment,
    mercadoPagoRedirect
}

//Enviando Mail
// let foo = await transporter.sendMail({
//     from: '"Ecommerce" <ecommerceg6ft11@gmail.com>', // sender address
//     to: cart.userId.email, // list of receivers
//     subject: "The Payment was received", // Subject line
//     text: "Thanks for your purchase!", // plain text body
//     html: "<b>Hello, your order has been successfully paid. <br/> Your traking code is:  </b>", // html body
// });


