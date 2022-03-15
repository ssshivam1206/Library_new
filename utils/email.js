const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transpoter = nodemailer.createTransport({
    service: 'Gmail',
    port: 25,
    auth: {
      user: 'sshivamsingh1206@gmail.com',
      pass: 'Shivam@1206',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: 'Shivam <sshivamsingh1206@gmail.com>',
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  await transpoter.sendMail(mailOptions);
};

module.exports = sendEmail;
