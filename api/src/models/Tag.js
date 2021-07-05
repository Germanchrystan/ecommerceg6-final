const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const TagSchema = new Schema (
    {
        _id: Schema.Types.ObjectId,
        name: {
            type: String,
            required: 'Name is required'
        }
    }
)