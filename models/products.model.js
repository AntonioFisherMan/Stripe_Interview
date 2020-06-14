const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    text: {
      type: String,
    },
    img:{
        type:String
    },
    price: {
      type: Number,
    }
  }

);

const Products = mongoose.model("Products", productsSchema);
module.exports = Products;
