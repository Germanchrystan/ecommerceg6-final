const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const tagSchema = new Schema (
    {
        _id: Schema.Types.ObjectId,
        name: {
            type: String,
            required: 'Name is required'
        }
    }
)

module.exports = mongoose.model('Tag', tagSchema)

