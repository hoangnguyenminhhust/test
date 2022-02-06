/* eslint-disable max-len */
const router = require('express').Router();
const productController = require('../controllers/product.controller');
const auth = require('../middlewares/auth');

// Không cần đăng nhập ( set theo device id )
router.route('/:productId') // Hàm xem sản phẩm của deivce chưa đăng nhập ( tính rate)
  .get(productController.getProduct);
router.route('/:productId/count') // Hàm đếm sau 5s gửi lên server để device tính thời gian live time ở sản phẩm ( Tính view)
  .put(productController.countProduct);
router.route('/recomend/product')
  .get(productController.getRecomendProductOverall); // Hàm xem danh sách sản phẩm recomend theo device ( chưa đăng nhập)
router.route('/recommend/:productId')
  .get(productController.getRecomendeProductInDetailProduct); // Hàm xem danh sách sản phẩm recomend theo device theo từng sản phẩm( chưa đăng nhập)

// Cần đăng nhập
router.route('/')
  .get(productController.listAllProduct)
  .post(auth.authUser, productController.createProduct);
router.route('/auth/recomend/product')
  .get(auth.authUser, productController.getRecomendProductOverall); // Hàm xem danh sách sản phẩm recomend the user (đẫ đăng nhập )
router.route('/auth/:productId/count')
  .put(auth.authUser, productController.countProduct); // Hàm đếm sau 5s gửi lên server để device tính thời gian live time ở sản phẩm (Tính view)
router.route('/auth/recomend/one-product')
  .get(auth.authUser, productController.getRecomendProductOverall); // Hàm xem danh sách sản phẩm recomend theo device theo từng sản phẩm( Đã đăng nhập)

router.route('/:productId')
  // eslint-disable-next-line max-len
  .get(productController.getProduct) // Hàm xem sản phẩm của user đã đăng nhập ( Tính rate)
  .put(productController.editProduct)
  .delete(auth.authUser, productController.deleteProduct);

router.route('/auth/:productId/count')
  .put(auth.authUser, productController.countProduct);
router.route('/auth/property/:productId')
  .post(auth.authUser, productController.createProductProp)
  .delete(auth.authUser, productController.deleteProductProp);

router.post('/get-product-by-category', productController.getProductByCategory);
router.post('/list-product-by-condition', productController.listProductByCondition);
router.post('/best-sell', productController.bestSell);

module.exports = router;
