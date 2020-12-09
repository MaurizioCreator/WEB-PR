const express = require('express');
const cors = require('express-cors')
const nodemailer = require("nodemailer");


const adminEmails = ['danil.tankoff@yandex.ru', 'liberalvlad@gmail.com'];


const generateAdminTemplate = (data) => {
    return `
        <div>
            Имя: ${data.name}
        </div>
        <div>
            Телефон: <a href="tel:${data.phone}">${data.phone}</a>
        </div>
        <div>
            Email: <a href="mailto:${data.email}">${data.email}</a>
        </div>
    `
};

const generateUserTemplate = (data) => {
    return `Спасибо за участие, ${data.name}! Наша команда свяжется с вами в ближайшее время!`;
}

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'liberalvlad@gmail.com',
        pass: 'kgeafsdvsfkqacst',
    },
});

const app = express();

app.use(cors({
    allowedOrigins: [
        'localhost:9000'
    ]
}))
app.use(express.json())

app.post('/api/contact', async (req, res) => {
    const data = req.body;

    const adminTemplate = generateAdminTemplate(data);
    const userTemplate = generateUserTemplate(data);

    try {
        let adminNotificationEmail = await transporter.sendMail({
            from: '"Спасём леса" <save.forests.together@rambler.ru>',
            to: adminEmails.join(', '),
            subject: `${data.name} хочет с вами связаться`,
            text: adminTemplate,
            html: adminTemplate,
        });

        let userEmail = await transporter.sendMail({
            from: '"Спасём леса" <save.forests.together@rambler.ru>',
            to: data.email,
            subject: 'Защитим сибирские леса!',
            text: userTemplate,
            html: userTemplate,
        });

        res.status(200).send();
    } catch (err) {
        res.status(500).json(err)
    }
})

app.listen(3000);
