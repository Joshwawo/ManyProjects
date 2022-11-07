import nodemailer, { TransportOptions } from "nodemailer";
import "dotenv/config";

export const sendEmailRegistration = async (data: any) => {
  console.log(data);
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  } as TransportOptions);

  // const transport = nodemailer.createTransport({
  //   host: mailtrap.MAIL_HOST,
  //   port: mailtrap.MAIL_PORT,
  //   auth: {
  //     user: mailtrap.MAIL_USER,
  //     pass: mailtrap.MAIL_PASS,
  //   },
  // } as TransportOptions);

  const vercelUrl = "https://jorgemorales.vercel.app";
  // const localUrl = "http://localhost:5173";
  const info = await transport.sendMail({
    from: "JorgeMorales - 👻",
    to: email,
    subject: "JM - Confirm your account  👻",
    text: "Confirm your account",
    html: `
    <p>hello, ${name}, check your account </p>
    <p>${name},si tu no has solicitado esto, ignora este email. 😊</p>
    <p>Tu cuenta solo necesita estar confirmada solo sigue el siguiente enlace:
    <a href="${vercelUrl}/confirm/${token}">Comprobar cuenta</a>
        `,
  });

  //   //   console.log("Message sent: %s", info.messageId);
  //   //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

export const sendEmailResetPassword = async (data: any) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  } as TransportOptions);

  const info = await transport.sendMail({
    //Quien el email
    from: '"Uptask - Administrador de proyectos" <hola@Moralitos@.com>',
    //Aquien le eviamos el email
    to: email,
    //Asunto
    subject: "Uptask - Reestablece tu Password",
    text: "Comprueba tu cuenta en UpTask",
    html: `
            <p>Hola, ${name}, Has Reestablece tu Password</p>
            <p>${name}, si tu no has solicitado esto, ignora este email. 😊</p>
            <p>Sigue el siguiente enlace para reestablecer tu Password:
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
        
            <p>
        
            `,
  });
};
