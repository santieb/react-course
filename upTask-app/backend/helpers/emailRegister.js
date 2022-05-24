import nodemailer from 'nodemailer'

const emailRegister = async data => {
  const { name, email, token } = data
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "855a5b529f356a",
      pass: "b576d78be072dd"
    }
  });

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

export default emailRegister