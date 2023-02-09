const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MANGO_URL = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

async function connectToDatabase() {
  try {
    await mongoose.c;
    console.log("Connecting to database...");
    onnect(MANGO_URL, {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("Connected to databse sccessfully");
    console.log(error);
    process.exit(1);
  }
}

module.exports = {
  connectToDatabase,
};
