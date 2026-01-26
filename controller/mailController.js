const nodemailer = require("nodemailer");
const { User } = require("../model/userModel");

const sendMail = async (pid, userId) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    const [user1, user2] = await Promise.all([
      User.findById(pid).select("email name username"),
      User.findById(userId).select("email name username"),
    ]);

    const mailOptions1 = {
      from: process.env.AUTH_EMAIL,
      to: user1.email,
      subject: "You have a crush",
      text: `You and ${user2.name} (${user2.username}) 
      have crush on each other!!! \n 
      Confess your love \n Best wishes from team pairly`,
    };

    const mailOptions2 = {
      from: process.env.AUTH_EMAIL,
      to: user2.email,
      subject: "You have a crush",
      text: `You and ${user1.name} (${user1.username}) 
      have crush on each other!!! \n 
      Confess your love \n Best wishes from team pairly`,
    };

    await Promise.all([
      transporter.sendMail(mailOptions1),
      transporter.sendMail(mailOptions2),
    ]);
    console.log("Emails sent successfully");
  } catch (error) {
    console.log("Error sending emails", error);
  }
};

const sendNotification = async (email, subject, htmlmsg) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: subject,
      html: htmlmsg,
    };
    await transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log("Email has been sent");
      })
      .catch((err) => console.log("Error in sending email", err));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendNotification, sendMail };
