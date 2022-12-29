const functions = require("firebase-functions");

// require("dotenv").config();

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const express = require("express");
const cors = require("cors");

const httpClientMail = express();
httpClientMail.use(express.json());
httpClientMail.use(cors({ origin: true }));

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});

httpClientMail.post("/postMail", (req, res) => {
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: `${req.body.email}`,
    subject: "Comfirmation email regarding your order with The Golden Ink.",
    text: `Hey ${req.body.user},
It’s time to celebrate 🥳 🥳 !!
Your order has been successfully placed here at the The Golden Ink!

Thanks for choosing us as your trusted partner in your journey towards the Shangri-La of books.

We hope you enjoy your new book(s) and if you don’t, don’t hesitate to just ring us up and avail our 7 day return and refund policy!
We know waiting is difficult but you don’t need to camp out by the mailbox, just drop a call and we'll let you know the delivery status!

Your order will be delivered to the following address:
${req.body.address}
Until next time, Keep Reading!!`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return res.status(200).send("Confirmation Email Sent");
});

exports.httpClientMail = functions.https.onRequest(httpClientMail);
