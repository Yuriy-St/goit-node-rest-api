import nodemailer  from 'nodemailer';

const { EMAIL_HOST, EMAIL_ACCOUNT, EMAIL_PASSWORD } = process.env;

const config = {
  host: EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_ACCOUNT,
    pass: EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(config);

const sendEmail = async data => {
  await transport.sendMail({ ...data, from: EMAIL_ACCOUNT });
};

export default sendEmail;
