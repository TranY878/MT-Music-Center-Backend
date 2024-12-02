const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', OrderController.createOrder)
router.get('/get-all-order-details/:id', OrderController.getAllOrderDetails)
router.get('/check-my-order/:id', OrderController.checkMyOrder)
router.delete('/cancel-order/:id', OrderController.cancelOrderDetails)
router.get('/get-all-order', authMiddleWare, OrderController.getAllOrder)
router.put('/update-status/:id', OrderController.updateOrderStatus);
router.post('/delete-many', authMiddleWare, OrderController.deleteMany)
router.get('/cart/:userId', authUserMiddleWare, OrderController.getCartByUserId);

module.exports = router