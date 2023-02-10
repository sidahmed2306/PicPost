const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MANGO_URL = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

async function connectToDatabase() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(MANGO_URL, {
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
