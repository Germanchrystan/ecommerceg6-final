const server = require("express").Router();
const {
    addCategories,
    getCategories,
    getCategoryById,
    deleteCategory,
    updateCategory
} = require("../controllers/categoryController");

// ------------------- ROUTES Categories ------------------

server.post('/', addCategories );
server.get('/', getCategories);
server.get('/productCategory/:id', getCategoryById)
server.put('/:id', updateCategory);
server.delete('/:id', deleteCategory);


module.exports = server;