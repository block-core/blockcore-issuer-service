import express from "express";
import cors from "cors";
import compression from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";

import credentials from "./routes/credentials.mjs";

import path from "path";
import { fileURLToPath } from "url";
import cookie from "cookie-parser";
import rateLimit from "express-rate-limit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5050;
const PRODUCTION = process.env["NODE_ENV"] === "production";
const KEY = process.env["JWT_KEY"];
const DID_KEY = process.env["DID_KEY"];
const rateLimitMinute = process.env["RATELIMIT"] ? Number(process.env["RATELIMIT"]) : 30;
const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: rateLimitMinute,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// console.log('ADMINS:', ADMINS);
// console.log('KEY:', KEY);

// app.use(cors({origin: ['http://localhost:5050', 'http://localhost:4200', 'https://hub.freeplatform.city']}));
// app.use(cors({origin: '*'}));
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cookie());
app.use(
  compression({
    threshold: 512,
  })
);

app.disable("x-powered-by");
app.use("/api/credential", credentials); // Backwards compatible, remove in future
app.use("/api/credentials", credentials);

app.use("/", express.static(path.join(__dirname, "dist/browser")));

// All other GET requests not handled before will return our Angular app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/browser/index.html"));
});

app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
