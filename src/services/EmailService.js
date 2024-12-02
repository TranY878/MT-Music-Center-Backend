const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config()

const sendEmailCreateOrder = async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let listItem = ''
    const attachImage = []
    orderItems.forEach((order) => {
        listItem += `<div>
        <div>Sản phẩm <b>${order.name}</b></div>
        <div>Số lượng: <b>${order.amount}</b></div>
        <div>Giá sản phẩm: <b>${order.price * order.amount} VNĐ</b></div>
        </div>
        <div>(Lưu ý: Giá hiển thị chưa bao gồm khuyến mãi)</div>
        <div>______________________________________________</div>`
        attachImage.push({ path: order.image })
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: "randyotran361@gmail.com", // list of receivers
        subject: "Trung tâm âm nhạc MT Music Center", // Subject line
        text: "Hello world?", // plain text body
        html: `<div><b>Đặt hàng thành công tại MT Music Center!</b></div>${listItem}`, // html body
        attachments: attachImage,
    });
}

module.exports = {
    sendEmailCreateOrder
}