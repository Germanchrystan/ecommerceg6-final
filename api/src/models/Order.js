  
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Float = require("mongoose-float").loadType(mongoose, 2);


const orderSchema = Schema({
  _id: Schema.Types.ObjectId,
  product: { type: Schema.Types.ObjectId, ref: "Product", required: "Add at least on product" },
  quantity: { type: Number, default: 1 },
  orderDate: { type: Date, default: Date.now },
  orderStatus: ["created", "pending", "cancel", "process", "completed"],
  total: { type: Float },
  mercadopagoId: { type: String },
  paymentLink: { type: String, required: 'URL can\'t be empty', unique: true},
});

orderSchema.path("paymentLink").validate((val) => {
  urlRegex =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, "Invalid URL.");

module.exports = mongoose.model("Order", orderSchema);
