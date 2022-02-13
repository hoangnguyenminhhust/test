const router = require('express').Router();
const categoryController = require('../controllers/parentCategory.controller');

router.route('/')
  .get(categoryController.listAllParentCategory)
  .post(categoryController.createParentCategory);

router.put('/:parentCategoryId', categoryController.editParentCategory);
router.delete('/:parentCategoryId', categoryController.deleteParentCategory);

module.exports = router;
