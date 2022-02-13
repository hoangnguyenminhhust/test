const mongoose = require('mongoose');

const {
  Schema,
  model,
} = mongoose;

const ParentCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
  },
}, {
  toJSON: {
    virtuals: true,
  }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: {
    virtuals: true,
  }, // So `console.log()` and other functions that use `toObject()` include virtuals
});

ParentCategorySchema.virtual('category', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent',
});

const ParentCategory = model('ParentCategory', ParentCategorySchema);
module.exports = ParentCategory;
