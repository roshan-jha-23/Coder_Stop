
import nodemailer from 'nodemailer'


export const sendEmail=async({email,emailType,userId}:any)=>{
    try {
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, 
          auth: {
            user: "maddison53@ethereal.email",
            pass: "jn7jnAPss4f63QBp6D",
          },
        });
        const mailOptions={
            from:process.env.SENDER_MAIL,
            to:email,
            subject:`${emailType} email`,
            html:'<>Hello ji mai kya soriye</>'
        }
        const mailResponse=await transporter.sendMail(mailOptions)
        return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}