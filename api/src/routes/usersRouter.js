const server = require("express").Router();
//---------------------------------------------------------------//
const {
    register,
    login,
    googleLogin,
    getUsers,
    updateUser,
    deleteUser,
    toggleAdmin,
    getUserById,
    changePassword,
    addAddress,
    removeAddress,
    addUser,
    deleteUserAdded
} = require("../controllers/userController");

const {
    isSameUser,
    isAdmin
} = require('../middlewares/customMiddlewares')

//-------------------------Route Users--------------------------//
server.get('/', getUsers);
server.get('/:_id', getUserById);

server.post('/login', login);
server.post('/register', register);
server.post('/google', googleLogin);
server.post('/addUser/:_id/:userId', isSameUser, addUser);

server.put('/:_id', isSameUser, updateUser);
server.put('/toggle/:_id', isAdmin, toggleAdmin);
server.put('/password/:_id', isSameUser, changePassword);
server.put('/removeUser/:_id/:userId', isSameUser, deleteUserAdded);

server.delete('/:_id', deleteUser);

server.post('/address/:_id', isSameUser, addAddress);
server.put('/address/remove/:_id', isSameUser, removeAddress);
//-------------------------------------------------------------//
module.exports = server;