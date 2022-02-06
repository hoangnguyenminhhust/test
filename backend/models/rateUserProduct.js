const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const rateUserProductSchema = new Schema({
  this_id: {
    type: String,
    require: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  total_view: {
    type: Number,
    default: 1,
  },
});

const RateUserProducts = mongoose.model('rate-user-products', rateUserProductSchema);
module.exports = RateUserProducts;
