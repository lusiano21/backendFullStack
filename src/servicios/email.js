import nodemailer from 'nodemailer'
import config from '../config/config.js';
class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.NodeMailer.EmailUser,
        pass: config.NodeMailer.EmailPass,
      },
    })
  }

  sendEmail(to, subject, html) {
    return this.transporter.sendMail({
      from: config.NodeMailer.EmailUser,
      to,
      subject,
      html,
    })
  }
}

export default new EmailService();