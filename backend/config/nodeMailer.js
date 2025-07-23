import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
     host:"smtp-relay.brevo.com",
     port:587,
     secure:false,
     auth:{
          user:process.env.SMTP_USER||"8b28aa003@smtp-brevo.com",
          pass:process.env.SMTP_PASS||"wMBQg4sHKAtqFDIN",
     },
     tls:{
          ciphers:'SSLv3',
          rejectUnauthorized:false
     }
});


export default transporter