const { Router } = require("express");
const router = Router();

// import all routers;
const productRouter = require("./productsRouter");
const categoryRouter = require('./categoryRouter')
const userRouter = require("./usersRouter");
const orderRouter = require('./orderRouter');
const reviewRouter = require('./reviewsRouter')
const cartRouter = require('./cartRouter');
const mercadoPagoRouter = require('./mercadoPagoRouter');
const whishlistRouter = require('./whishlistRouter');

// load each router on a route

router.use("/products", productRouter); // Ex: http://localhost:3001/products ... para probar ruta
router.use('/categories', categoryRouter) // Ex: http://localhost:3001/categories ... para probar ruta
router.use("/users", userRouter); // Ex: http://localhost:3001/users ... para probar ruta
router.use('/orders', orderRouter); // Ex: http://localhost:3001/orders ... para probar ruta
router.use('/reviews', reviewRouter) // Ex: http://localhost:3001/reviews ... para probar ruta
router.use('/carts', cartRouter) // Ex: http://localhost:3001/carts ... para probar ruta
router.use('/mercadopago', mercadoPagoRouter); // Ex: http://localhost:3001/mercadopago ... para probar ruta
router.use('/whishlists', whishlistRouter); // Ex: http://localhost:3001/whishlists ... para probar ruta

module.exports = router;