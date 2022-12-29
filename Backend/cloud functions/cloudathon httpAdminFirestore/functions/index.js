const functions = require("firebase-functions");

const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const express = require("express");
const cors = require("cors");

const httpAdminFireStore = express();
httpAdminFireStore.use(cors({ origin: true }));
httpAdminFireStore.use(express.json());

const db = admin.firestore();
const collectionRef = db.collection("orders");

// get
httpAdminFireStore.get("/", (req, res) => {
  return res.status(200).send("hello World");
});

httpAdminFireStore.get("/getOrders", (req, res) => {
  (async () => {
    try {
      let newData = [];
      const data = await collectionRef.get();
      data.forEach((doc) => {
        newData = [...newData, { orderId: doc.id, ...doc.data() }];
      });
      // const storeItems = new Map(newData);
      console.log(newData);
      res.json({ newData });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ status: "failed", msg: "internal error" });
    }
  })();
});

//delete
httpAdminFireStore.post("/removeOrder", (req, res) => {
  const orderId = req.body.id;
  (async () => {
    try {
      await collectionRef.doc(orderId).delete();
      res.json({ msg: "order deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ status: "failed", msg: "internal error" });
    }
  })();
});

exports.httpAdminFireStore = functions.https.onRequest(httpAdminFireStore);
