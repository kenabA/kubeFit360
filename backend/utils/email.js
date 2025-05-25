const pug = require('pug');
const nodemailer = require('nodemailer');
const { convert } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Kenab Kushal K.C. <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // Send the actual email

    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject: subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: html,
      text: convert(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send('welcome', 'Welcome to the kubeFit360° Family!');
  }

  async sendWelcomeStaff() {
    await this.send('welcomeStaff', 'Welcome to the kubeFit360° Family!');
  }

  async sendPayment() {
    await this.send('payment', 'Pay to proceed further');
  }
  async sendClientApproval() {
    await this.send(
      'clientApproval',
      'Make payment to enroll into the system!',
    );
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Reset your account Password!');
  }

  async sendClientRejection() {
    await this.send('clientRejection', 'Client Request Rejection!');
  }
};
