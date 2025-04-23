const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alaehscape@gmail.com',       // replace with your email
      pass: 'znmg bpsk ixka pjaf',    // use App Password if using Gmail
    },
  });

  const mailOptions = {
    from: '"Ala-Eh-scape" <alaehscape@gmail.com>',
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
