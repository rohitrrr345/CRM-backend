import nodemailer from 'nodemailer';

export const sendAlert = async (message) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
  port: 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ALERT_EMAIL,
    subject: 'EzyMetrics Alert',
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Alert email sent');
  } catch (error) {
    console.error('Error sending alert email:', error);
  }
};
