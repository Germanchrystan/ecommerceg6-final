const mongoose = require("mongoose");
const { Schema } = require("mongoose");


const brandSchema = new Schema (
    {
        _id: Schema.Types.ObjectId,
        name: {
            type: String,
            required: 'Brand name is required'
        },
        description: {
            type: String
        }
    }
)

module.exports = mongoose.model("Brand", brandSchema);