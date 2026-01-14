import https from "https";
import fs from "fs";
import app from "@/app.js";
import { getConnection } from "@database/connection.js";
import config from "@config/env.js";

// Options for HTTPS server
const options = {
  //   key: fs.readFileSync("./certs/"),   // private key
  //   cert: fs.readFileSync("./certs/"),  // certificate
  //   ca: fs.readFileSync("./certs/"), // certificate chain
};

// Connection to the database and then start the server
getConnection()
  .then(() => {
    https.createServer(options, app).listen(config.PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on https://0.0.0.0:${config.PORT}`);
    });
  })
  .catch((error: any) => {
    console.error("❌ Server startup failed:", error);
    process.exit(1); // Exit if connection fails
  });
