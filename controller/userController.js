const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const { User } = require("../model/userModel");
const { Otp } = require("../model/otpModel");
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

module.exports.signUp = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({
        success: false,
        message: "user already exists",
      });
    }

    const OTP = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const email = req.body.email;
    const username = email.split("@")[0].toLowerCase();

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "verify your email",
      html: `<body style="background-color: grey;">
                <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="550"
                    bgcolor="white"
                    style="border: 2px solid black;"
                >
            <tbody>
            <tr>
                <td align="center">
                <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="col-550"
                    width="550"
                >
                    <tbody>
                    <tr>
                        <td
                        align="center"
                        style="background-color: #4cb96b; height: 50px;"
                        >
                        <a href="#" style="text-decoration: none;">
                            <p
                            style="
                                color: white;
                                font-weight: bold;
                                margin: 0;
                            "
                            >
                            Pairly 💕
                            </p>
                        </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </td>
            </tr>

            <tr style="height: 300px;">
                <td
                align="center"
                style="
                    border: none;
                    border-bottom: 2px solid #4cb96b;
                    padding-right: 20px;
                    padding-left: 20px;
                "
                >
                <p
                    style="
                    font-weight: bolder;
                    font-size: 20px;
                    letter-spacing: 0.025em;
                    color: black;
                    "
                >
                    <span style="font-size: 30px;">
                    Hello ${username}!
                    </span>
                    <br /><br />
                    Your OTP is
                    <span style="color: red;">${OTP}</span>
                    <br />
                    This OTP is valid only for 5 minutes
                </p>
                </td>
            </tr>
            </tbody>
        </table>
        </body>`,
    };

    const otp = new Otp({ email, otp: OTP });
    console.log(otp.otp, typeof otp.otp);
    const salt = await bcrypt.genSalt(10);
    console.log(salt, typeof salt);
    otp.otp = await bcrypt.hash(otp.otp, salt);
    console.log(otp.otp);
    const rseult = await otp.save();
    await transporter
      .sendMail(mailOptions)
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Email has been sent",
        });
      })

      .catch((err) => {
        console.log(`Error sending email : ${err.message}`);
      });

    return;
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Server Error",
    });
  }
};
