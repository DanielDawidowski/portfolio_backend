import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import { joiValidation } from "@root/helpers/joi-validation.decorators";
// import { contactAdminTemplate } from "@services/emails/templates/contact/contact-admin-template";
import { emailSchema } from "@email/schemes/email.schema";
import { IContactTemplate } from "@email/interface/email.interface";
import { config } from "@root/config";
import { mailTransport } from "@services/emails/mail.transport";

export class Create {
  @joiValidation(emailSchema)
  public async contact(req: Request, res: Response): Promise<void> {
    const { name, email, message } = req.body;
    const templateParams: IContactTemplate = {
      name,
      email,
      message
    } as IContactTemplate;

    // const template: string = contactAdminTemplate.sendMessageToAdmin(templateParams);
    const subject = `Nowa wiadomość od ${name}`;
    await mailTransport.sendEmail(config.SENDER_EMAIL!, subject, templateParams);

    res.status(HTTP_STATUS.OK).json({ message: "Wiadomość wysłana" });
  }
}
