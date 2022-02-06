const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const BannerSchema = new Schema({
  key: {
    type: String,
  },
  level: {
    type: Number,
  },
});

const Banner = model('Banner', BannerSchema);
module.exports = Banner;
