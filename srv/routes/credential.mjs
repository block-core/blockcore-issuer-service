import express from "express";
import db from "../db/conn.mjs";
import MUUID from "uuid-mongodb";
import { VerifiableCredential } from "@web5/credentials";

const router = express.Router();
const collectionName = "credential";
const DID_KEY = process.env["DID_KEY"];

// Get a single credential
router.get("/:schema/:id", async (req, res) => {
  let collection = await db.collection(collectionName);

  let query = {
    subject: req.params.id,
    "vc.type": { $in: [req.params.schema] },
  };

  // let query = { subject: req.params.id, 'vc.type': req.params.schema };
  console.log("QUERY:", query);

  //   let query = { _id: ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) {
    res.status(404).send("Not found");
  } else {
    delete result._id;
    delete result.date;
    res.send(result);
  }
});

// Get a single credential
router.get("/:id", async (req, res) => {
  let collection = await db.collection(collectionName);

  let query = { subject: req.params.id };
  //   let query = { _id: ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) {
    res.status(404).send("Not found");
  } else {
    delete result._id;
    delete result.date;
    res.send(result);
  }
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  let newDocument = req.body;
  console.log("Input:", newDocument);

  let schema = newDocument.schema; // For later use when we have added support for multiple schemas
  let subject = newDocument.did;
  let jsonKey = JSON.parse(DID_KEY);

  try {
    console.log("Trying to make VC: ", subject);

    const vc = await VerifiableCredential.create({
      type: "WorldVoluntaryistOrganisationCredential",
      issuer: jsonKey.did,
      subject: subject,
      data: {
        signed: "The Voluntaryist Covenant",
        version: "1.0",
        hash: "856da8db8fec583255fa09cc19c64a93d44cba7a4d6c408282643fc581ae6c4b",
      },
    });

    const signedVcJwt = await vc.sign({ did: jsonKey });
    const vcDoc = VerifiableCredential.parseJwt({ vcJwt: signedVcJwt });

    const result = {
      issuer: vcDoc.vcDataModel.issuer,
      subject: subject,
      jwt: signedVcJwt,
      vc: vcDoc.vcDataModel,
    };

    // If we can't persist, let's just ignore that.
    try {
      let collection = await db.collection(collectionName);
      let newDocument = result;

      // We must delete the MongoDB ID, since we are upserting with a different key.
      delete newDocument.id;

      // newDocument._id = MUUID.v4();
      newDocument.date = new Date();

      let filter = { subject: subject }; // filter by _id field
      let update = { $set: newDocument }; // set newDocument as the new data

      await collection.updateOne(filter, update, { upsert: true });

      console.log("Saved to database: " + vcDoc.vcDataModel.credentialSubject.id);
    } catch (err) {
      console.error(err);
    }

    res.send(result);
  } catch (err) {
    console.error(err);
    return { error: "Something bad happened. Unable to complete the process." };
  }
});

export default router;
