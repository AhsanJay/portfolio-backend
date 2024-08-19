const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const EMAIL_USER = 'inoxxentbob@gmail.com'; 
const EMAIL_PASS = 'gowr ffho pvvx xjcx'; 

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body; 

    if (!email || !message) {
        return res.status(400).send('Email and message are required');
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `${email}`, 
        to: 'Ahsanjay.official@icloud.com', 
        replyTo: email,
        subject: `Message from ${name}`, 
        text: message, 
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send message');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
