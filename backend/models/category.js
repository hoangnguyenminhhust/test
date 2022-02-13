const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParentCategory',
  },
});

const Category = model('Category', CategorySchema);
module.exports = Category;
