/* eslint array-callback-return: */
/* eslint prefer-destructuring: */

/**
 * Load Module dependencies
 */
import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

/**
 * Load database configuration
 */
import { database, username, password, options } from "../config/database";

/**
 * Start database instance
 */
const db = new Sequelize(database, username, password, options);
const models = db.models;

/**
 * Lcate models directory
 */
const modelsPath = path.join(__dirname, "../app/models");

/**
 * Load application models
 */
fs.readdirSync(modelsPath)
  .filter(file => file.indexOf(".") > 0)
  .map(file => db.import(path.join(modelsPath, file)));

/**
 * Setup models relationship
 */
Object.keys(models).map((modelName) => {
  if ("defineRelationship" in models[modelName]) {
    models[modelName].defineRelationship(models);
  }
});

export default db;
