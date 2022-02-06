const express = require('express');

const router = express.Router();

const orderController = require('../controllers/order.controller');

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrder);
router.get('/:orderId', orderController.getOrder);
router.put('/:orderId', orderController.updateOrder);
router.post('/list-order-by-condition', orderController.listOrderByCondition);
router.delete('/:orderId', orderController.deleteOrder);
router.post('/return-product', orderController.cancelOrder);
router.post('/get-fee-ship', orderController.getFeeShip);
router.post('/change-order-status/', orderController.changeStatusOrder);
router.post('/get-order-detail', orderController.getOrderDetail);
router.post('/find-order', orderController.findOrder);
router.post('/create-order-ship', orderController.createShipOrder);
router.post('/list-order-by-status', orderController.listOrderByStatus);
router.post('/list-order-by-user', orderController.getOrderByUser);
router.post('/list-order-by-device', orderController.getOrderByDevice);

module.exports = router;
