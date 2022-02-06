const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const recomendProductDetail = new Schema({
  this_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    unique: true,
  },
  avg_cost: {
    type: Number,
  },
  screen: {
    type: Number,
  },
  ram: {
    type: Number,
  },
  list_cost: {
    type: Array,
  },
});

const recomenderProductDetail = mongoose.model('recomend', recomendProductDetail);
module.exports = recomenderProductDetail;
