var nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "ecommerceg6ft11@gmail.com", // generated ethereal user
        pass: "vvzflnzfwawofijz", // generated ethereal password
    },
    debug:false,
    tls: {
        rejectUnauthorized: false
    } /*
    service: "hotmail",
        auth: {
            user: "adaclothes@hotmail.com",
            pass: "Lovelace123"
        }*/
});

// let foo = await transporter.sendMail({
//     from: '"Ecommerce" <ecommerceg6ft11@gmail.com>', // sender address
//     to: "franbbr110@gmail.com", // list of receivers
//     subject: "Compra realizada", // Subject line
//     text: "Su compra se ha realizado satisfactoriamente. Muchas gracias!", // plain text body
//     html: "<b>Hello world?</b>", // html body
// });

module.exports = { transporter };