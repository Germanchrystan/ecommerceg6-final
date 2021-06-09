const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressSchema = new Schema ({
    street:{
        type:'String',
        require: 'Street Name is required',
    },
    streetNumber:{
        type:'Number',
        
    },
    floor:{
        type:'Number',

    },
    apartmentLetter:{
        type: 'String'
    },
    zipcode:{
        type: 'String',
        required:'Zip Code is Required'
    },
    state:{
        type: 'String'
    },
    country:{
        type: 'String',
        required: 'Country is Required'
    }
})

module.exports = mongoose.model("Address", addressSchema);
