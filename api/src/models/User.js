const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        username:{
            type:'String',
            required: "Username is required",
        },
        usersAdded: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        password:{
            type:'String',
            //required:"Password is required"
        },
        email:{
            type: 'String',
            required: "E-mail address is required",
            unique: true,
            match: /[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        firstname:{
            type: 'String',
            required: "First Name is required"
        },
        lastname:{
            type: 'String',
            required: "Last Name is required"
        },
        phone:{
            type: 'Number',
            required: false
        },
        streetNumber:{
            type:"Number",
            required: false
        },
        street:{
            type:'String',
            required: false
        },
        state:{
            type:'String',
            required:false
        },
        country:{
            type: 'String',
            required: false
        },
        zipcode:{
            type: 'String',
            required: false
        },
        isAdmin: {
            type: 'Boolean',
            required: true,
            default: true
        },
        isFromGoogle: {
            type: 'Boolean',
            required: true,
            default: false
        },
        addresses:[{address:{type:String}}]
    },
    {
        timestamps: false
    }
)

module.exports = mongoose.model("User", userSchema);