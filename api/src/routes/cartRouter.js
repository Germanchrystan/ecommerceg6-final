const server = require('express').Router();

const {
    getActiveCartFromUser,
    getAllCarts,
    getCartsByUser,
    addItem,
    stateChange,
    removeProductFromCart,
    incrementProductUnit,
    decrementProductUnit,
    getCartsById,
    stateChangePagoAcreditado
} = require('../controllers/cartController')

// ------------------------------ ROUTES Cart ---------------------------- //
//==========================================================================//
                //Ruta para obtener todos los carts
//==========================================================================//
server.get('/', getAllCarts)
//==========================================================================//
                //Ruta para obtener un cart por id
//==========================================================================//
// server.get('/:userId', getActiveCartFromUser);
//==========================================================================//
                //Ruta para obtener cart activo del user (o crearlo)
//==========================================================================//
server.get('/active/:userId', getActiveCartFromUser)
server.get('/:userId', getCartsByUser)
//==========================================================================//
                //Ruta para agregar item (producto) al cart
//==========================================================================//
server.post('/:userId', addItem);
//==========================================================================//
                //Ruta para cambiar estado del cart
//==========================================================================//
server.put('/:cartId', stateChange)
server.post('/:userId/changestate', stateChange)
//==========================================================================//
                //Ruta para quitar producto al cart 
//==========================================================================//
server.put('/remove/:userId', removeProductFromCart)
//==========================================================================//
                //Ruta para quitar una unidad a un producto del cart
//==========================================================================//
server.put('/decrement/:userId', decrementProductUnit)
//==========================================================================//
                //Ruta para aumentar una unidad a un producto del cart
//==========================================================================//
server.put('/increment/:userId', incrementProductUnit)
//==========================================================================//
server.get('/id/:_id', getCartsById)

module.exports = server;