require('dotenv').config();
const nodemailer = require('nodemailer');
const config = require('./config');


// sendEmail
module.exports.sendEmail = (body, res, message) => {
  const transporter = nodemailer.createTransport({
    host: config.development.email_host,
    service: config.development.email_service, //comment this line if you use custom server/domain
    port: config.development.email_port,
    secure: true,
    auth: {
      user: config.development.email_user,
      pass: config.development.email_pass
    },
    
  });

  transporter.verify(function (err, success) {
    if (err) {
      res.status(403).send({
        message: `Error happen when verify ${err.message}`,
      });
      console.log(err.message);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  transporter.sendMail(body, (err, data) => {
    if (err) {
      res.status(403).send({
        message: `Error happen when sending email ${err.message}`,
      });
    } else {
      res.send({
        message: message,
      });
    }
  });
};

