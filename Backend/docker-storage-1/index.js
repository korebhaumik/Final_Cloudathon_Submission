// THIS IS FOR UPLOADING IMAGE ON CLOUD STORAGE
const express = require('express')
const port = process.env.PORT || 8084
const { Storage } = require("@google-cloud/storage")
const Multer = require("multer")
const cors = require('cors');

const app = express()

app.use(cors({ origin: true }));

console.log("meow")

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,  //max size will be 5 mbs
  },
})

// test-mehdi
let projectId = "admin-mehdi-cloud"  // got this from google cloud
let keyFilename = "mykey.json" // from google cloud -> Credentials -> Service Accounts

const storage = new Storage({
  projectId,
  keyFilename,
})

// bhaumikbucket
const bucket = storage.bucket("finalbucket-cloudathon") //name of storage bucket oif the project from google cloud -> Storage

app.get("/" , (req,res)=>{
    res.send("<h1>SERVER ERROR: unauthorized invocation of $/google%resources: ur account has been suspended</h1>")
})

// get files  in defined bucket and send it to the frontend as a response
app.get("/getimg", async (req, res) => {
  try {
    const [files] = await bucket.getFiles(); // gets files from cloud storage
    res.send([files])
    console.log("sent", files)
    console.log("SUccEESS")
  } catch (error) {
    res.send("Error:" + error)
  }
})

// got the files as req and uploading file to Google Storage
app.post("/uploadimg", multer.single("imgfile"), (req, res) => {
  console.log("Made it /upload");
  try {
    if (req.file) {
      console.log("File found, trying to upload...");
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        res.status(200).send("Success");
        console.log("Success");
      });
      blobStream.end(req.file.buffer);
    } else throw "error with img";
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`server started at port ${port}`)
})

