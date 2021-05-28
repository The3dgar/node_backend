import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const mailerHelper = {
  sendMail: async (email, type, data) => {
    // el html es variable en funcion del type de correo, por ahora se coloca asi
    const msg = {
      to: email,
      from: process.env.SENDGRID_API_EMAIL,
      subject: 'Reestablece tu contraseña 🔒',
      text: 'Reestablece tu contraseña',
      html: `
        <font style='font-family: verdana; font-size: 10pt'>
        <b>Hola ${data.name}</b>
        <br><br>
        Tus credenciales para ingresar son:
        <br><br>
        <b>Password:</b>&nbsp;${data.password}
        <br><br>
        <b>Saludos,</b>
        <br><br>
        <b>ERES INCREIBLE! ❤</b>
      </font>`
    }

    return await sgMail.send(msg)
  }
}

export default mailerHelper
