import nodemailer from 'nodemailer'

const emailRegister = async data => {
  const { name, email, token } = data
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const info = await transport.sendMail({
    from: '"UpTask - Team" <cuentas@uptask.com>',
    to: email,
    subject: "Uptask - Confirma tu cuenta",
    text: "Comprueba tu cuenta en UpTask",
    html: `
    <p>Hola ${name} comprueba tu cuenta en UpTask</p>
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguente enlace: </p>
    <a href="${process.env.FRONTEND_URL}/confirm/${token}">Comprobar Cuenta</a>
    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `
  })
}

const emailForgotPassword = async data => {
  const { name, email, token } = data
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const info = await transport.sendMail({
    from: '"UpTask - Team" <cuentas@uptask.com>',
    to: email,
    subject: "Uptask - Reestablece tu contraseña",
    text: "Reestablece tu contraseña",
    html: `
    <p>Hola ${name} Has solicitado reestablece tu contraseña</p>
    <p>En el siguente enlace puedes restablecer tu contraseña: </p>
    <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Restablecer contraseña</a>
    <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
    `
  })
}

export {
  emailRegister,
  emailForgotPassword
}