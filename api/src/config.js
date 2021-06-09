// Read environment variables
require("dotenv").config();

const configurations = {   
    MONGODB_URI: `mongodb+srv://mongo:mongoose@cluster0.58swq.mongodb.net/ecommercedb?retryWrites=true&w=majority`
};


module.exports = configurations;