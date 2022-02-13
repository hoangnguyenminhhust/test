const ParentCategory = require('../models/parentCategory');
const Category = require('../models/category');

module.exports = {
  async createParentCategory(req, res) {
    try {
      const category = new ParentCategory(req.body);
      await category.save();

      res.status(200).send(category);
    } catch (error) {
      res.status(409).send(error);
    }
  },
  async deleteParentCategory(req, res) {
    try {
      const product = await Category.findOne({
        parent: req.params.parentCategoryId,
      });
      if (product) {
        return res.status(405).send({
          error: 'You must delete all category in parent!!',
        });
      }
      await ParentCategory.findByIdAndDelete(req.params.parentCategoryId);

      return res.status(200).send();
    } catch (error) {
      return res.status(404).send(error);
    }
  },
  async listAllParentCategory(req, res) {
    try {
      const categories = await ParentCategory.find({}).populate('category');
      console.log(categories);
      res.status(200).send(categories);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  async editParentCategory(req, res) {
    try {
      await ParentCategory.findByIdAndUpdate(req.params.parentCategoryId, {
        name: req.body.name,
        level: parseInt(req.body.level, 10),
      }, {
        new: true,
      });
      res.status(200).send();
    } catch (error) {
      res.status(404).send(error);
    }
  },
};
