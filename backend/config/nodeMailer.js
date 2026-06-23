import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
     console.warn("⚠️ Warning: SMTP_USER and SMTP_PASS are not configured in environment variables. E-mail notifications will fail.");
}

const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
     port: parseInt(process.env.SMTP_PORT) || 587,
     secure: process.env.SMTP_SECURE === "true",
     auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
     },
     tls: {
          ciphers: 'SSLv3',
          rejectUnauthorized: false
     }
});


export default transporter