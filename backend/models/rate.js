const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const RateSchema = new Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  rate: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  customer: {
    fullname: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  content: {
    type: String,
  },
  created_at: {
    type: Date,
  },
});

const Rate = model('Rate', RateSchema);
module.exports = Rate;
