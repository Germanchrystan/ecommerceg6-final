const mongoose = require("mongoose");
const { Schema } = mongoose;


const categorySchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String },
  description: { type: String },
});


module.exports = mongoose.model("Category", categorySchema);

