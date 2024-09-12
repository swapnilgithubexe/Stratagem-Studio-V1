import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: lightgrey;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid Purple;
            box-shadow: 6px 4px Purple;
            text-align: center;
        }
        h1 {
            color: Purple;
        }
        p {
            color: black;
            font: 3vmax "sans-serif";
        }
        .otp {
            font-size: 36px;
            color: Purple;
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Verification</h1>
        <p>Hello ${data.name},Greetings from StrataGem Studios! </p>
        <p> your (One-Time Password) for your account verification is.</p>
        <p class="otp">${data.otp}</p> 
    </div>
</body>
</html>
`

  await transport.sendMail({
    from: process.env.Gmail,
    to: email,
    subject,
    html
  })
};

export default sendMail;