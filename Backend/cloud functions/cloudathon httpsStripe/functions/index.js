const functions = require("firebase-functions");

require("dotenv").config();

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const db = admin.firestore();
const collectionRef = db.collection("Bhaumik_Books");

const httpClientStripe = express();
httpClientStripe.use(express.json());
httpClientStripe.use(cors({ origin: true }));

httpClientStripe.get("/", (req, res) => {
  return res.status(200).send("I love stripe js");
});

httpClientStripe.post("/placeOrder", async (req, res) => {
  try {
    let newData = [];
    const data = await collectionRef.get();
    data.forEach((doc) => {
      newData = [...newData, [doc.id, doc.data()]];
    });
    let storeItems = new Map(newData);
    // console.log(storeItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: 50000,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SUCCESS_URL}`,
      cancel_url: `${process.env.CANCEL_URL}`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

exports.httpClientStripe = functions.https.onRequest(httpClientStripe);