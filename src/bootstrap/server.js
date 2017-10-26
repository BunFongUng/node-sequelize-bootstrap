/* eslint no-console: */

/**
 * Module dependencies
 */
import http from "http";

/**
 * Load application configuration and dependencies
 */
import app from "./app";
import { port } from "../config/app";
import db from "./database";

/**
 * Initialize application server
 */
const server = http.createServer(app);

db.sync({ force: false })
  .then(() => server.listen(port, () => console.log(`Server running on port ${port}`)))
  .catch(e => console.log("Unable to start server", e));

export default server;
