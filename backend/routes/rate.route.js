const router = require('express').Router();
const rateController = require('../controllers/rate.controller');

router.get('/:productId', rateController.getProductRate);
router.post('/', rateController.createRate);
router.post('/filter-rate', rateController.filterRates);

module.exports = router;
