require('dotenv').config();
const nodemailer = require('nodemailer');

const datosEnvio = nodemailer.createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  port: process.env.EMAIL_PORT,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

datosEnvio.verify((err, success) => {
  if (err) {
    console.log(`Error al verificar la configuración del correo: ${err.message}`);
  } else {
    console.log('El servidor está listo para enviar correos.');
  }
});

module.exports.enviarCorreo = (body, res, msg) => {
  datosEnvio.sendMail(body, (err, data) => {
    if (err) {
      if (!res.headersSent) {
        res.status(403).send({
          mensaje: `Error al enviar el correo: ${err.message}`,
        });
      }
    } else {
      if (!res.headersSent) {
        res.send({
          mensaje: msg,
        });
      }
    }
  });
};
