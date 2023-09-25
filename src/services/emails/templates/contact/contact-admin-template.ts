import fs from "fs";
import ejs from "ejs";
import { IContactTemplate } from "@root/features/email/interface/email.interface";

class ContactAdminTemplate {
  public sendMessageToAdmin(templateParams: IContactTemplate): string {
    const { name, email, message } = templateParams;

    return ejs.render(fs.readFileSync(__dirname + "/contact-admin-template.ejs", "utf8"), {
      name,
      email,
      message
    });
  }
}

export const contactAdminTemplate: ContactAdminTemplate = new ContactAdminTemplate();
