import mailer from 'nodemailer'
const { createTransport } = mailer
export default (email, sub, text) => {
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'neeb252.12@gmail.com',
      pass: 'Neeb252282528'
    }
  })

  const mailOptions = {
    from: 'NPOS@POS.com',
    to: email,
    subject: sub,
    text
  }

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return error
    } else {
      return true
    }
  })
}
