const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const firenode = express();
firenode.use(cors({ origin: true }));

var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const collectionRef = db.collection("test");

// TIMEPASS ROUTE
firenode.get("/", (req, res) => {
  return res.status(200).send("<h1>INTERNAL SERVER ERROR:u fucked up the server:ur account will be suspended</h1>");
});

//CREATE USING POST METHOD
firenode.post("/api/create", (req, res) => {
  (async () => {
    try {
      let arraygenre = []
      Object.keys(req.body.genre).forEach(function (key, index) {
        if (req.body.genre[key]) {
          arraygenre.push(key)
        }
      });
      console.log(arraygenre)
      await collectionRef.add({
        // https://storage.googleapis.com/finalbucket-cloudathon/${formData.name}_image.png
        url: `https://storage.googleapis.com/book-images-69420/${req.body.name}_image.png`,
        name: req.body.name,
        author: req.body.author,
        genre: arraygenre,
        rating: `${Math.floor(Math.random() * 5)}`,
      });
      return res.status(200).send({ status: "success", msg: "data saved" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ status: "failed", msg: "internal error" });
    }
  })();
});


// GET DATA USING  GET METHOD
firenode.get("/api/getData", (req, res) => {
  (async () => {
    try {
      let newData = [];
      const data = await collectionRef.get();
      data.forEach((doc) => {
        newData = [...newData, { id: doc.id, ...doc.data() }];
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


// exports the data to firebase cloud functions
exports.firenode = functions.https.onRequest(firenode);