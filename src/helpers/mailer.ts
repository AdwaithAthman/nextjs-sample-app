import nodemailer from "nodemailer";
import User from "@/src/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        //create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST!,
            port: Number(process.env.MAILTRAP_PORT!),
            auth: {
                user: process.env.MAILTRAP_USER!,
                pass: process.env.MAILTRAP_PASS!,
            }
        });

        const mailOptions = {
            from: 'iamadwaith17@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your account" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN!}/verifyemail?token=${hashedToken}">here</a> or copy and paste the following 
            ${process.env.DOMAIN!}/verifyemail?token=${hashedToken}
            to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;   
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}