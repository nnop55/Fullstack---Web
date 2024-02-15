import nodemailer from "nodemailer"
import { MailerPass } from "../config";
import { Response } from "express";

export class MailerService {

    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'appchat194@gmail.com',
            pass: MailerPass
        }
    });

    constructor() { }

    public async sentMail(email: string, verifyCode: string, res: Response) {
        try {
            const mailMessage = {
                from: 'appchat194@gmail.com',
                to: email,
                subject: 'Verify code from parking application',
                text: 'Code: ' + verifyCode
            };


            return await new Promise<void>((resolve, reject) => {
                this.transporter.sendMail(mailMessage, (error, success) => {
                    if (error) {
                        console.log(error);
                        reject(error)
                        return
                    }
                    resolve();
                    console.log('Nodemailer Email sent: ' + success.response);
                    res.status(200).json({ message: 'Verification code sent successfully' });

                });
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to verify' });
        }


    }

    public async transporterVerify() {
        try {
            return await new Promise<void>((resolve, reject) => {
                this.transporter.verify(function (error, success) {
                    if (error) {
                        reject(error)
                        return
                    }
                    resolve()
                    console.log('Server validation done and ready for messages.')

                });
            })
        } catch (err) {
            console.log(err);
        }
    }

}