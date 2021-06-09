const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Float = require("mongoose-float").loadType(mongoose, 2);

const productSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: {
      type: String,
      required: "Name is required",
    },
    img: [
      {
        type: String,
        // require: "Image is required",
      }
    ],
    brand: {
      type: String,
      required: "Brand is required",
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    description: {
      type: String,
    },
    genre: {
      type: String,
    },
    price: {
      type: Number,
      // required: "Price is required",
      validate: {
        validator: function (v) {
          return /^[+-]?\d+(\.\d+)?$/.test(v);
        },
        message: props => `${props.value} is not a valid number!`
      },
      required: [true, 'Insert a number required']
    },
    custom:{
      type: Boolean,
      default: false
    },
    customRevision:{
      type: String,
      default: "Approved"
    },
    userId:{
      type: String,
      default: "store"
    },
    productReview: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      }
    ],
    customSize:{
      type:String
    },
    stock: [
      {
        type: Schema.Types.ObjectId,
        ref:"Stock",
      }
    ],
    discount: {
      percentage:{type:Number, default:0},
      newPrice: {type: Float}
    }
  },
  {
    timestamps: true,
  }
);


productSchema.methods.setImgUrl = function setImgUrl(filename, name) {
  this.img = filename
}

module.exports = mongoose.model("Product", productSchema);
