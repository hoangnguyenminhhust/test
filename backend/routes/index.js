const express = require('express');

const router = express.Router();
const userRoute = require('./user.route');
const categoryRoute = require('./category.route');
const parentCategoryRoute = require('./parentCategory.route');
const productRoute = require('./product.route');
const uploadRoute = require('./upload.route');
const orderRoute = require('./order.route');
const paymentRoute = require('./payment.route');
const locationRoute = require('./location.route');
const bannerRoute = require('./banner.route');
const dashboardRoute = require('./dashboard.route');
const rateRoute = require('./rate.route');

router.use('/user', userRoute);
router.use('/category', categoryRoute);
router.use('/parentCategory', parentCategoryRoute);
router.use('/product', productRoute);
router.use('/upload', uploadRoute);
router.use('/order', orderRoute);
router.use('/payment', paymentRoute);
router.use('/location', locationRoute);
router.use('/banner', bannerRoute);
router.use('/dashboard', dashboardRoute);
router.use('/rate', rateRoute);

module.exports = router;
