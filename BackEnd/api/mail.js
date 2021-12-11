const mailer = require('nodemailer')

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fluegelsfluege@gmail.com',
        pass: config.google_password
    }
});

function sendMail(to, subject, text) {
    transporter.sendMail({
        from: 'fluegelsfluege@gmail.com',
        to, subject, text
    }, (err, info) => {
        if (err) console.log(err)
    })
}

module.exports = { sendMail }