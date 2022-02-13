const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ParentCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
  },
});

const Category = model('ParentCategory', ParentCategorySchema);
module.exports = Category;
