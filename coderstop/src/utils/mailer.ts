import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }:any) => {
 
  try {

    if (
      !process.env.SENDER_MAIL ||
      !process.env.SENDER_MAIL_PASS ||
      !process.env.DOMAIN
    ) {
      throw new Error("Missing environment variables");
    }
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.SENDER_MAIL_PASS,
      },
    });

    const salt = await bcryptjs.genSalt(10);
    const hashedToken = await bcryptjs.hash(userId.toString(), salt);

    let updateUserFields;
    if (emailType === "VERIFY") {
      updateUserFields = {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      };
    } else if (emailType === "RESET") {
      updateUserFields = {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
      };
    } else {
      throw new Error("Invalid email type");
    }

    await User.findByIdAndUpdate(userId, { $set: updateUserFields });
    const mailOptions = {
      from: process.env.SENDER_MAIL,
      to: email,
      subject: `${emailType} Email`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hello,</h2>
          <p>You have requested to ${
            emailType === "VERIFY"
              ? "verify your email address"
              : "reset your password"
          }.</p>
          <p>Please click the link below to ${
            emailType === "VERIFY" ? "verify your email" : "reset your password"
          }:</p>
          <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 4px;">${
        emailType === "VERIFY" ? "Verify Email" : "Reset Password"
      }</a>
      <p>If This Link does not work copy paste ${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}</p>
          <p>This link is valid for 1 hour.</p>
          <p>If you did not request this, please ignore this email.</p>
          <p>Thanks,</p>
          <p>Your Company Team</p>
        </div>
      `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error:any) {
    throw new Error(error.message);
  }
};
