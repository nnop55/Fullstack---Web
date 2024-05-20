import nodemailer from "nodemailer"
import { MailerPass } from "../config/config";

const htmlEmailTemplate = (code: string) => {
    return (
        `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        p {
            color: #666;
        }
        .verification-code {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }
        .footer {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ccc;
            text-align: center;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Email Verification</h2>
        <p>Dear User,</p>
        <p>Your verification code is: <span class="verification-code">${code}</span></p>
        <p>Please use this code to verify your email address.</p>
    </div>
</body>
</html>
`)
}

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

if (process.env.NODE_ENV !== 'test') {
    transporterVerify();
}


export function sentMail(email: string, verifyCode: string) {
    const mailOptions = {
        from: 'appchat194@gmail.com',
        to: email,
        subject: 'Verify code from parking application',
        html: htmlEmailTemplate(verifyCode)
    };

    return new Promise<void>((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, success) => {
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



