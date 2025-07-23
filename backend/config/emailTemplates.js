 export const CONGRATS_MSG_TEMPLATE = ({ email }) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
    <h2 style="color: #6A38C2; margin-bottom: 10px;">🎉 Welcome to Task Manager!</h2>
    <p style="margin: 0 0 10px;">We're excited to have you onboard.</p>
    <p style="margin: 0 0 10px;">
      Your account has been successfully created using the email: <strong>${email}</strong>.
    </p>
    <p style="margin: 20px 0 0;">Start organizing your tasks efficiently and stay on top of your goals.</p>
    <p style="margin-top: 30px;">– The Task Manager Team</p>
  </div>
`;

export const TASK_ASSIGNMENT_TEMPLATE = `

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>New Task Assigned</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px auto;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      background: #4C83EE;
      text-decoration: none;
      display: inline-block;
      padding: 12px 20px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 100% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#F6FAFB">
    <tr>
      <td align="center">
        <table class="container" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td class="main-content">
              <h2 style="margin-top: 0; margin-bottom: 20px;">You've Been Assigned a New Task!</h2>
              <p style="font-size: 14px; line-height: 150%;">
                Hello <strong>{{userName}}</strong>,
              </p>
              <p style="font-size: 14px; line-height: 150%;">
                <strong>{{assignedBy}}</strong> has assigned you a new task.
              </p>
              <p style="font-size: 14px; line-height: 150%;">
                <strong>Task:</strong> {{taskName}}<br>
                <strong>Due Date:</strong> {{dueDate}}
              </p>
              <p style="margin: 24px 0;">
                <a class="button" href="{{taskLink}}" target="_blank">View Task</a>
              </p>
              <p style="font-size: 13px; color: #666;">If you have any questions, feel free to reach out to your manager.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>

</html>

`;

 
 
 
 
 
export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Password Reset</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #f0f2f5;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 60px auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .header {
      background: #4C83EE;
      color: white;
      padding: 20px;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
      letter-spacing: 0.5px;
    }

    .main-content {
      padding: 30px;
      color: #333;
    }

    .main-content h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }

    .main-content p {
      font-size: 14px;
      line-height: 1.6;
      margin: 10px 0;
    }

    .otp-box {
      margin: 20px auto;
      background: #22D172;
      color: #fff;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      padding: 14px 0;
      border-radius: 10px;
      letter-spacing: 4px;
    }

    .footer {
      background: #f6f6f6;
      padding: 15px 20px;
      font-size: 12px;
      color: #777;
      text-align: center;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 90% !important;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>Task Manager</h1>
    </div>
    <div class="main-content">
      <h2>Password Reset Request</h2>
      <p>Hi,</p>
      <p>We received a request to reset your password for the account associated with <strong style="color: #4C83EE;">{{email}}</strong>.</p>
      <p>Use the OTP below to proceed with resetting your password:</p>
      <div class="otp-box">{{otp}}</div>
      <p>This OTP is valid for <strong>15 minutes</strong>.</p>
      <p>If you did not request a password reset, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Task Manager. All rights reserved.
    </div>
  </div>
</body>
</html>
`;


