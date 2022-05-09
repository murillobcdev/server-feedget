import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "02961a6b2ff0ee",
    pass: "41d6dcb96e2adc",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: "Feedget Team <murillobdev@gmail.com>",
      to: "Murillo <murillobdev@gmail.com>",
      subject: subject,
      html: body,
    });
  }
}
