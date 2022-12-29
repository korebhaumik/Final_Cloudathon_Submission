const functions = require("firebase-functions");

const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const express = require("express");
const cors = require("cors");

const httpClientFirestore = express();
httpClientFirestore.use(cors({ origin: true }));
httpClientFirestore.use(express.json());

const db = admin.firestore();
const collectionRef = db.collection("Bhaumik_Books");
const collectionRefOrders = db.collection("orders");

// get books
httpClientFirestore.get("/", (req, res) => {
  return res.status(200).send("hello World");
});

httpClientFirestore.get("/getBooksData", (req, res) => {
  (async () => {
    try {
      let newData = [];
      const data = await collectionRef.get();
      data.forEach((doc) => {
        newData = [...newData, { id: doc.id, ...doc.data() }];
      });
      console.log(newData);
      res.json({ newData });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ status: "failed", msg: "internal error" });
    }
  })();
});

//post orders
httpClientFirestore.post("/addOrder", (req, res) => {
  // const obj = JSON.parse(req.body.orderData);
  const obj = req.body.orderData;
  (async () => {
    try {
      await collectionRefOrders.add({
        address: req.body.address,
        user: req.body.user,
        email: req.body.email,
        number: req.body.number,
        books: obj,
      });
      return res.status(200).send({ status: "success", msg: "order added" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ status: "failed", msg: "internal error" });
    }
  })();
});

exports.httpClientFirestore = functions.https.onRequest(httpClientFirestore);
