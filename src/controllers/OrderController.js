const OrderService = require('../services/OrderService')

const createOrder = async (req, res) => {
    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, email } = req.body
        if (!paymentMethod || !itemsPrice || !totalPrice || !fullName || !address || !city || !phone || !email) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Thiếu thông tin!'
            })
        }
        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const checkMyOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Kiểm tra lại ID người dùng!'
            })
        }
        const response = await OrderService.checkMyOrder(orderId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Kiểm tra lại ID người dùng!'
            })
        }
        const response = await OrderService.getAllOrderDetails(userId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const cancelOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.id
        const data = req.body
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Kiểm tra lại ID người dùng!'
            })
        }
        const response = await OrderService.cancelOrderDetails(orderId, data)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id
        const updatedOrder = req.body
        const token = req.headers.authorization.split(' ')[1] // Lấy token từ headers

        if (!orderId || !updatedOrder) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Thiếu thông tin cập nhật!'
            })
        }

        // Gọi hàm updateOrderStatus từ OrderService
        const response = await OrderService.updateOrderStatus(orderId, updatedOrder, token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Cập nhật trạng thái đơn hàng thất bại!'
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Kiểm tra lại các ID!'
            })
        }
        const response = await OrderService.deleteManyOrder(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Kiểm tra lại ID người dùng!'
            });
        }
        const response = await OrderService.getCartByUserId(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Lỗi không xác định khi lấy giỏ hàng!'
        });
    }
};

module.exports = {
    createOrder,
    getAllOrderDetails,
    checkMyOrder,
    cancelOrderDetails,
    getAllOrder,
    updateOrderStatus,
    deleteMany,
    getCartByUserId
}