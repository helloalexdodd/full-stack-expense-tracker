const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { User } = require('models/user');

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(200)
      .send({ message: 'Recovery email sent. Check your inbox.' });

  const token = crypto.randomBytes(20).toString('hex');

  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now();
  await user.save();

  const transporter = nodemailer.createTransport({
    host: 'mail.hover.com',
    auth: {
      user: 'hello@alexdodd.ca',
      pass: '3LEo@DY7!B&R27',
    },
  });

  const mailOptions = {
    from: 'Expense Tracker <hello@alexdodd.ca>',
    to: email,
    subject: 'Password Reset',
    text:
      'You or someone else has requested a password reset for your account. If it was you, please click the following link or paste it into your browser to reset your password\n\n' +
      `http://localhost:8081/#/resetpassword?token=${token}\n\n` +
      'If you did not request this, ignore this email and your password will remain the same.',
    html: `
      <p>You or someone else has requested a password reset for your account. If it was you, please click <a href="http://localhost:8081/#/resetpassword?token=${token}">this link</a> or paste it into your browser to reset your password.</p>
      <p>If you did not request this, ignore this email and your password will remain the same.</p>
      `,
    amp: `
      <!doctype html>
        <html ⚡4email>
        <head>
          <meta charset="utf-8">
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <style amp4email-boilerplate>body{visibility:hidden}</style>
          <style amp-custom>
            h1 {
              margin: 1rem;
            }
          </style>
        </head>
        <body>
          <p>You or someone else has requested a password reset for your account. If it was you, please click <a href="http://localhost:8081/#/resetpassword?token=${token}">this link</a> or paste it into your browser to reset your password.</p>
          <p>If you did not request this, ignore this email and your password will remain the same.</p>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) console.log('there was an error', err);
    else
      res
        .status(200)
        .send({ message: 'Recovery email sent. Check your inbox.' });
  });
};

module.exports = forgotPassword;
