// const jwt = require("jsonwebtoken");

import jwt from 'jsonwebtoken';
import express from 'express';
import crypto from 'crypto';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import User from '../models/UserSchema.js';
dotenv.config()

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  console.log("Received a GET HTTP method");
  res.send(`Hello world from the server rotuer js`);
});

authRouter.post("/register", async (req, res) => {
  const { name, email, password, graduation, branch } = req.body;
  if (!name || !email ||  !password || !branch || !graduation) {
    return res.status(422).json({ error: "Please fill data correctly!" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(201).json({ error: "User Already Exists!" });
    }
    else {
      // const user = new User({ name, email, password, graduation, branch });
      const user = new User({
        "name": name,
        "email": email,
        "password": password,
        "graduation": graduation,
        "branch": branch
      })
      await user.save();
      res.status(200).json({ message: "User Registered Successfully!" });
    }
  } catch (err) {
    console.log(err);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  // return res.json({ message: "user signed in successfully" });
  // TODO if successfull then send jwt token
  if (!email || !password) {
    return res.status(400).json({ error: "plz fill data properly" });
  }
  try {
    const userLogin = await User.findOne({ email: email });
    if (!userLogin) {
      res.status(400).json({ error: "user error" });
    } else {
      console.log(userLogin);
      // Replace with your own secret key

      // // privilige 0 for superadmin 1 for admin 2 for user
      // // currently hardcoded to 2, change it later []
      // // TODO
      // const token = jwt.sign(
      //   { uid: userLogin._id, privilege: 2, user_role: userLogin.user_role },
      //   secretKey,
      //   {
      //     expiresIn: "24h",
      //   }
      // );

      sendEmail(email);
      res.status(200).json({ message: "success" });
    }
  } catch (err) {
    console.log(err);
  }
});

authRouter.post("/otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(email, otp);
    let userLogin = await User.findOne({ email: email });
    console.log(userLogin);

    console.log("otp", userLogin.otp);

    if (userLogin.otp == otp) {
      const secretKey = "your_secret_key";
      const token = jwt.sign(
        { uid: userLogin._id, privilege: 2, user_role: userLogin.user_role },
        secretKey,
        {
          expiresIn: "24h",
        }
      );
      return res.status(200).json({
        message: "user signed in successfully",
        token: token,
        // work: userLogin.work,
        user_role: userLogin.user_role,
        email: userLogin.email,
        name: userLogin.name,
        uid: userLogin._id,
        privilege: 2,
      });
    } else {
      return res.status(403).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Interal Server Error" });
  }
});

async function sendEmail(toEmail) {
  // create reusable transporter object using the default SMTP transport
  try{
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAILPASS,
      },
    });
  
    let otp = generateOTP();
    let user = await User.findOne({ email: toEmail });
    user.otp = otp;
  
    await user.save();
    // Schedule a task to set otp to null after 3 minutes
    setTimeout(async () => {
      // console.log("setting otp to null")
      user.otp = null;
      await user.save();
      // console.log("done")
    }, 3 * 60 * 1000); // 3 minutes in milliseconds
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"No Reply" <Support>`, // sender address
      to: toEmail, // list of receivers
      subject: "OTP for Verification", // Subject line
      text: `Your OTP for verification is: ${otp}`, // plain text body
    });
  
    console.log(`Message sent: ${info.messageId}`);

  } catch (err) {
    console.log(err);
  }

  
}

function generateOTP() {
  return crypto.randomInt(100000, 999999); // generate OTP between 100000 and 999999
}

export default authRouter;

