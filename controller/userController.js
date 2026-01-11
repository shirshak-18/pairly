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

    const salt = await bcrypt.genSalt(10);

    otp.otp = await bcrypt.hash(otp.otp, salt);

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

module.exports.verifyOtp = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({
      email,
    });

    if (user) {
      return res.status(400).send({
        success: false,
        message: "user already exists",
      });
    }

    const optHolder = await Otp.find({
      email,
    });

    if (optHolder.length === 0) {
      return res.status(400).json({
        message: "Otp Expierd or Invalid",
      });
    }

    const rightOtpFind = optHolder[optHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
    if (!validUser) {
      return res.status(403).json({
        message: "Invalid User",
      });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const username = email.split("@")[0];

    if (rightOtpFind.email === req.body.email && validUser) {
      const user = new User({
        email,
        username,
        password,
        hasphoto: false,
      });
      const token = user.generateJWT();
      const result = await user.save();
      const OTPDelete = await Otp.deleteMany({
        email: rightOtpFind.email,
      });

      return res.status(200).send({
        success: true,
        message: "User created successfully",
        token,
        user: result,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "invalid otp",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }
    const hashedPassword = await user.password;
    const isValid = await bcrypt.compare(req.body.password, hashedPassword);
    if (user && isValid) {
      const token = user.generateJWT();
      res.status(200).send({
        success: true,
        message: "User logged in",
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
        },
        token,
      });
    } else {
      res.send({
        success: false,
        message: "Incorrect email or password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.sendOtpForPasswordReset = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "user does not exist",
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

    const salt = await bcrypt.genSalt(10);

    otp.otp = await bcrypt.hash(otp.otp, salt);

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
        res.status(500).json({
          success: false,
          message: "failed to send email",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: "Server Error" });
  }
};

module.exports.verifyOtpAndResetPassword = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "user does not exist",
      });
    }

    const optHolder = await Otp.find({
      email: req.body.email,
    });

    if (optHolder.length === 0) {
      return res.status(400).json({
        message: "Otp Expierd or Invalid",
      });
    }

    const rightOtpFind = optHolder[optHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
    if (!validUser) {
      return res.status(403).json({
        message: "Invalid OTP",
      });
    }
    const password = await bcrypt.hash(req.body.password, 10);

    if (rightOtpFind.email === req.body.email && validUser) {
      user.password = password;
      const result = await user.save();
      const OTPDelete = await Otp.deleteMany({
        email: rightOtpFind.email,
      });

      return res.status(200).send({
        success: true,
        message: "Password Reset successfully",
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Server Error",
    });
  }
};
