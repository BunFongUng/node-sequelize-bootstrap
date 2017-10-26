import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";

/**
 * Load application configuration and dependencies
 */
import { env } from "../config/app";
import db from "./database";
import setupRouter from "./router";

/**
 * Initialize modules
 */
const app = express();

/**
 * Bind database instance to the application
 */
app.db = db;
app.env = env;

/**
 * Add additional middleware to the application
 */
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
setupRouter(app);

export default app;
