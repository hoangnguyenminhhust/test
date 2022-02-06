const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  customer: {
    fullname: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    province: {
      type: Number,
    },
    district: {
      type: Number,
    },
    ward: {
      type: String,
    },
  },
  device_id: {
    type: String,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  created_at: {
    type: Date,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['pending', 'finish'],
    default: 'pending',
  },
  payment_method: {
    type: String,
    enum: ['online', 'offline'],
  },
  note: {
    type: String,
  },
  ship_code: {
    type: String,
    default: null,
  },
});

const Order = model('Order', OrderSchema);
module.exports = Order;
