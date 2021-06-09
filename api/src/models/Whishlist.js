const mongoose = require ('mongoose');
const { Schema } = mongoose;
const Float = require("mongoose-float").loadType(mongoose, 2);


const whishlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        productId: {type: Schema.Types.ObjectId, ref: 'Product'},
            name: {type: String},
            price: {type: Float},
    }]
})

module.exports = mongoose.model('Whishlist', whishlistSchema);