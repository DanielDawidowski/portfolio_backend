import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import Logger from "bunyan";
import { config } from "@root/config";
import { BadRequestError } from "@root/helpers/error-handler";
import { IContactTemplate } from "@email/interface/email.interface";

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const log: Logger = config.createLogger("mailOptions");

class MailTransport {
  public async sendEmail(receiverEmail: string, subject: string, body: IContactTemplate): Promise<void> {
    this.developmentEmailSender(receiverEmail, subject, body);
  }

  private async developmentEmailSender(receiverEmail: string, subject: string, body: IContactTemplate): Promise<void> {
    const { name, email, message } = body;
    const transporter: Mail = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SENDER_EMAIL, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
        pass: process.env.SENDER_EMAIL_PASSWORD // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
      },
      tls: {
        ciphers: "SSLv3"
      }
    });

    const mailOptions: IMailOptions = {
      from: `Aktywne Obozy <${config.SENDER_EMAIL!}>`,
      to: receiverEmail,
      subject,
      html: `
      <h4><bold>Email:</bold>  ${email}</h4>
      <h4><bold>Pytanie od:</bold>  ${name}</h4>
      <p><bold>Wiadomość:</bold> ${message}</p>
      <hr />
  `
    };

    try {
      await transporter.sendMail(mailOptions);
      log.info("Development email sent successfully.");
    } catch (error) {
      log.error("Error sending email", error);
      throw new BadRequestError("Error sending email");
    }
  }
}

export const mailTransport: MailTransport = new MailTransport();
