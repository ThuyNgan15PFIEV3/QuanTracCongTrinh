let nodemailer = require('nodemailer');
let Nexmo = require('nexmo');
let socketio = require('socket.io');
export default class WarningController {
    sendMail = async(req, res, next) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            service: 'gmail',
            auth: {
                user: '<account>',
                pass: '<password>'
            }
        });

        let mailOptions = {
            from: 'thuyngan1997@gmail.com',
            to: 'thuyngan1997@gmail.com',
            subject: 'Cảnh báo quan trắc',
            text: 'Nhiệt độ vượt quá ngưỡng cho phép!'
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.send(error);

            } else {
                console.log('Email sent: ' + info.response);
                res.send('Email sent: ' + info.response);
            }
        });
    }
    sendSMS = async(req, res, next) => {
        const nexmo = new Nexmo({
            apiKey: '57d326df',
            apiSecret: 'GBoKCQDcdc8Tghb9'
        }, { debug: true });
        const from = 'Nexmo';
        const to = '84932445662';
        const text = 'Helle Ngan cute';
        nexmo.message.sendSms(from, to, text);
    }
}