import nodemailer from "nodemailer"
import { MailerPass } from "../config";


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'appchat194@gmail.com',
        pass: MailerPass
    }
});

function transporterVerify() {
    transporter.verify(function (error, success) {
        if (error) {
            console.error("Mail service failed")
            return
        }
        console.log('Server validation done and ready for messages.')
    });

}

transporterVerify()


export function sentMail(email: string, verifyCode: string) {
    const mailMessage = {
        from: 'appchat194@gmail.com',
        to: email,
        subject: 'Verify code from parking application',
        text: 'Code: ' + verifyCode
    };

    return new Promise<void>((resolve, reject) => {
        transporter.sendMail(mailMessage, (error, success) => {
            if (error) {
                console.log(error);
                reject(error)
                return
            }
            resolve();
            console.log('Nodemailer Email sent: ' + success.response);

        });
    })
}



