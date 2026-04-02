// Mail/Email.js
const nodemailer = require("nodemailer");
require("dotenv").config();

// ✅ Create transporter using environment variables
const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

// ✅ Send Student ID Email
const sendStudentIdEmail = async (to, studentName, studentId) => {
    try {
        const mailOptions = {
            from: '"School Admin" <admin@school.com>',
            to,
            subject: "🎓 Your Student ID has been Generated!",
            html: `
        <h2>Hello ${studentName},</h2>
        <p>We are happy to inform you that your student ID has been generated successfully!</p>
        <p><strong>Your Student ID:</strong> ${studentId}</p>
        <p>Thank you for joining our school. Please keep this ID for future reference.</p>
        <br/>
        <p>Best regards,<br/>School Administration</p>
      `,
        };

        await transport.sendMail(mailOptions);
        console.log(`📧 Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

module.exports = { sendStudentIdEmail };
