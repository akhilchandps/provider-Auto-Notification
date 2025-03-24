const nodemailer = require('nodemailer');
require('dotenv').config();

// ✅ Configure SMTP transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

// ✅ Function to send email notification
const sendEmail = async (to, subject, message) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: message
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('❌ Email sending failed:', error);
    }
};

module.exports = { sendEmail };
