const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")
const EmailService = require("../services/EmailService")

const createOrder = async (newOrder) => {
    const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user, isPaid, paidAt, email } = newOrder;
    try {
        const promises = orderItems.map(async (order) => {
            const productData = await Product.findOneAndUpdate(
                {
                    _id: order.product,
                    countInStock: { $gte: order.amount }
                },
                {
                    $inc: {
                        countInStock: -order.amount,
                        selled: order.amount
                    }
                },
                { new: true }
            );
            if (productData) {
                return {
                    status: 'OK',
                    message: 'Thành công!'
                };
            } else {
                return {
                    status: 'ERR',
                    message: 'Đã xảy ra lỗi!',
                    id: order.product
                };
            }
        });

        const results = await Promise.all(promises);
        const newData = results.filter((item) => item.id);

        if (newData.length) {
            const arrId = newData.map((item) => item.id);
            return {
                status: 'ERR',
                message: `Sản phẩm với id (${arrId.join(', ')}) không đủ hàng!`
            };
        }

        const createdOrder = await Order.create({
            orderItems,
            shippingAddress: {
                fullName,
                address,
                city,
                phone,
                email
            },
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            user,
            isPaid,
            paidAt
        });

        if (createdOrder) {
            await EmailService.sendEmailCreateOrder(email, orderItems);
        }

        return {
            status: 'OK',
            message: 'Đặt hàng thành công!'
        };
    } catch (e) {
        return {
            status: 'ERR',
            message: `Đã xảy ra lỗi: ${e.message}`
        };
    }
};

const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'Đơn hàng không tồn tại!'
                })
            }

            resolve({
                status: 'OK',
                message: 'Lấy thông tin đơn hàng thành công!',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const checkMyOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'Đơn hàng không tồn tại!'
                })
            }

            resolve({
                status: 'OK',
                message: 'Lấy thông tin đơn hàng thành công!',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const cancelOrderDetails = async (id, data) => {
    try {
        const promises = data.map(async (order) => {
            const productData = await Product.findOneAndUpdate(
                {
                    _id: order.product,
                    selled: { $gte: order.amount }
                },
                {
                    $inc: {
                        countInStock: order.amount,
                        selled: -order.amount
                    }
                },
                { new: true }
            );
            if (productData) {
                return {
                    status: 'OK',
                    message: 'Cập nhật sản phẩm thành công!'
                };
            } else {
                return {
                    status: 'ERR',
                    message: 'Đã xảy ra lỗi!',
                    id: order.product
                };
            }
        });

        const results = await Promise.all(promises);
        const errorProducts = results.filter((item) => item.status === 'ERR');

        if (errorProducts.length) {
            const arrId = errorProducts.map((item) => item.id);
            return {
                status: 'ERR',
                message: `Sản phẩm với id (${arrId.join(', ')}) không tồn tại!`
            };
        }

        // Xóa đơn hàng sau khi tất cả các sản phẩm đã được cập nhật thành công
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return {
                status: 'ERR',
                message: 'Đơn hàng không tồn tại!'
            };
        }

        return {
            status: 'OK',
            message: 'Hủy đơn hàng thành công!',
            data: deletedOrder
        };
    } catch (e) {
        return {
            status: 'ERR',
            message: `Đã xảy ra lỗi: ${e.message}`
        };
    }
};

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find()
            resolve({
                status: 'OK',
                message: 'Lấy tất cả đơn hàng thành công!',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateOrderStatus = (orderId, updatedOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm đơn hàng theo ID
            const checkOrder = await Order.findOne({ _id: orderId });
            if (!checkOrder) {
                resolve({
                    status: 'ERR',
                    message: 'Đơn hàng không tồn tại!'
                });
            }

            // Kiểm tra trạng thái mới của đơn hàng
            if (updatedOrder.status === "Đã hủy") {
                // Hoàn lại số lượng countInStock và selled
                const promises = checkOrder.orderItems.map(async (order) => {
                    const productData = await Product.findOneAndUpdate(
                        {
                            _id: order.product,
                            selled: { $gte: order.amount }
                        },
                        {
                            $inc: {
                                countInStock: order.amount,
                                selled: -order.amount
                            }
                        },
                        { new: true }
                    );
                    if (!productData) {
                        return {
                            status: 'ERR',
                            message: 'Không tìm thấy sản phẩm hoặc không thể cập nhật!',
                            id: order.product
                        };
                    }
                    return { status: 'OK' };
                });

                const results = await Promise.all(promises);
                const errorProducts = results.filter((item) => item.status === 'ERR');

                if (errorProducts.length) {
                    const arrId = errorProducts.map((item) => item.id);
                    return resolve({
                        status: 'ERR',
                        message: `Sản phẩm với id (${arrId.join(', ')}) không tồn tại hoặc không thể cập nhật!`
                    });
                }
            }

            // Cập nhật trạng thái đơn hàng
            const updatedStatus = await Order.findByIdAndUpdate(orderId, updatedOrder, { new: true });
            resolve({
                status: 'OK',
                message: 'Cập nhật trạng thái đơn hàng thành công!',
                data: updatedStatus
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: `Đã xảy ra lỗi: ${e.message}`
            });
        }
    });
};


const deleteManyOrder = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Order.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Xóa các đơn hàng thành công!',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getCartByUserId = async (userId) => {
    try {
        // Lấy các sản phẩm trong giỏ hàng dựa vào userId và trạng thái chưa thanh toán
        const cartItems = await Order.find({ user: userId, isPaid: false });
        if (!cartItems || cartItems.length === 0) {
            return {
                status: 'ERR',
                message: 'Giỏ hàng trống hoặc không tồn tại!'
            };
        }
        return {
            status: 'OK',
            message: 'Lấy thông tin giỏ hàng thành công!',
            data: cartItems
        };
    } catch (e) {
        return {
            status: 'ERR',
            message: `Đã xảy ra lỗi: ${e.message}`
        };
    }
};

module.exports = {
    createOrder,
    getAllOrderDetails,
    checkMyOrder,
    cancelOrderDetails,
    getAllOrder,
    updateOrderStatus,
    deleteManyOrder,
    getCartByUserId
}