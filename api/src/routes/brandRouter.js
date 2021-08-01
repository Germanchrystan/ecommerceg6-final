const server = require('express').Router();

const {
    getBrands,
    getBrandById,
    addBrand,
    removeBrand
} = require('../controllers/brandController')

// ------------------------------ ROUTES Brand ---------------------------- //
//==========================================================================//
                //Ruta para obtener todas las brands
//==========================================================================//
server.get('/', getBrands);
//==========================================================================//
                //Ruta para obtener una brand por Id
//==========================================================================//
server.get('/:_id',getBrandById);
//==========================================================================//
                //Ruta para agregar una brand
//==========================================================================//
server.post('/', addBrand)
//==========================================================================//
                //Ruta para remover una brand
//==========================================================================//
server.delete('/:_id', removeBrand)

module.exports = server;