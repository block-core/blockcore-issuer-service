import { MongoClient } from "mongodb";

const connectionString = process.env.ISSUER_DATABASE || "";
const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

let db = conn.db("blockcore-issuer-service");

export default db;
