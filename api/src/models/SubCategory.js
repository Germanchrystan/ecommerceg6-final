const mongoose = require("mongoose");
const { Schema } = mongoose;



const subcagoriesSchema = new Schema({
  name: {
    type: String,
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }]
})

module.exports = mongoose.model("SubCategory", subcagoriesSchema);
