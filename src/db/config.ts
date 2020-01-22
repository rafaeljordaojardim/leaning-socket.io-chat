import mongoose from "mongoose";
require("dotenv").config();
const mongoose = require("mongoose");

try {
  (async function () {
    await mongoose.connect(`mongodb://${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
  })();
} catch (error) {
  console.error("Error connecting with database", error);
}
