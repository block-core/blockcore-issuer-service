import express from "express";
import db from "../db/conn.mjs";
import MUUID from "uuid-mongodb";
import { VerifiableCredential } from "@web5/credentials";

const router = express.Router();
const collectionName = "credential";
const DID_KEY = process.env["DID_KEY"];

router.get("/:schema/count", async (req, res) => {
  try {
    let collection = await db.collection(collectionName);

    let result = await collection
      .aggregate([
        { $match: { "vc.type": { $in: [req.params.schema] } } },
        { $unwind: "$vc.credentialSubject" },
        {
          $group: {
            _id: "$vc.credentialSubject.id",
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    let count = result[0] ? result[0].count : 0;

    res.send({ count: count });
  } catch (err) {
    res.status(500).send("Error");
  }
});

router.get("/:schema/id", async (req, res) => {
  try {
    let collection = await db.collection(collectionName);
    let result = await collection
      .aggregate([
        { $match: { "vc.type": { $in: [req.params.schema] } } },
        { $unwind: "$vc.credentialSubject" },
        {
          $group: {
            _id: null,
            ids: { $push: "$vc.credentialSubject.id" },
          },
        },
      ])
      .toArray();

    let ids = result[0] ? result[0].ids : [];

    res.send(ids);
  } catch (err) {
    res.status(500).send("Error");
  }
});

export default router;
