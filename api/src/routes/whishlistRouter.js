const server = require('express').Router();

const {
    getOrCreateWhishlistFromUser,
    addProductToWhishlist,
    removeProductFromWhishlist,
    toggleProductFromWhishlist,
    isProductInWhishlist
} = require('../controllers/whishlistController')

// -------------------------ROUTES Whishlist------------------------------- //
//==========================================================================//
server.get('/:userId', getOrCreateWhishlistFromUser);
//==========================================================================//
server.post('/:userId/:productId', addProductToWhishlist);
//==========================================================================//
server.put('/:userId/:productId', removeProductFromWhishlist);
//==========================================================================//
server.put('/toggle/:userId/:productId', toggleProductFromWhishlist)
//==========================================================================//
server.get('/includes/:userId/:productId', isProductInWhishlist)
//==========================================================================//

module.exports = server ; 