const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html) => {


    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // Use true for port 465
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text, // Plain text version
            html, // HTML version
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;

// // Simulate email sending
// (async () => {
//     console.log("Simulating email sending...");
//     await sendEmail(
//         'noobcoder76@gmail.com',
//         'Sample Subject',
//         'This is a plain text body.',
//         `<p>This is a sample paragraph.</p>`
//     );
// })();
