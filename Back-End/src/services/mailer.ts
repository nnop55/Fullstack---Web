import nodemailer from "nodemailer"
import { MailerPass } from "../config";
import { Response } from "express";

export class Mailer {

    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'appchat194@gmail.com',
            pass: MailerPass
        }
    });

    constructor() { }

    public async sentMail(email: string, verifyCode: number, res: Response) {
        const mailMessage = {
            from: 'appchat194@gmail.com',
            to: email,
            subject: 'Verify code from chat application',
            text: 'Code: ' + verifyCode
        };

        this.transporter.sendMail(mailMessage, function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log('Nodemailer Email sent: ' + success.response);
                res.status(200).json({ message: 'Verification code sent successfully' });
            }
        });
    }

    public transporterVerify() {
        this.transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log('Server validation done and ready for messages.')
            }
        });
    }

}