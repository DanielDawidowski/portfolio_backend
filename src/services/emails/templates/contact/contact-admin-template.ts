import fs from "fs";
import ejs from "ejs";
import { IContactTemplate } from "@email/interface/email.interface";

class ContactAdminTemplate {
  public sendMessageToAdmin(templateParams: IContactTemplate): string {
    const { name, email, message } = templateParams;

    const str = fs.readFileSync(__dirname + "/contact-admin-template.ejs", "utf8");

    const template = ejs.compile(str, { filename: __dirname + "/contact-admin-template.ejs" });

    return template({ name, email, message });
  }
}

export const contactAdminTemplate: ContactAdminTemplate = new ContactAdminTemplate();
