const mongoose = require('mongoose');
const { Schema } = mongoose;
const Float = require("mongoose-float").loadType(mongoose, 2);

const cartSchema = new Schema({
  userId: {type:Schema.Types.ObjectId, ref: 'User'},
  items: [{ 
    productId: {type:Schema.Types.ObjectId, ref:'Product'},  
    name:{ type: String },
    quantity: { type:Number, required: true, min:[1], default: 1 },
    colorName:{type: String},
    sizeName: {type: String},
    stock: {type: Number},
    price: Float
  }],
  state:{ type: String, default: 'Active' },
  totalAmount:{ type: Float },
  address:{type: String, default: ''},
  payment:{
    link: {type: String, default: ''},
    id: {type: String, default:''}
  },
  fechaCierre:{type:Schema.Types.Date}     
})


module.exports = mongoose.model('Cart', cartSchema);