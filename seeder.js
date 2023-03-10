
const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const { MONGODB_URI} = process.env;



const client = new MongoClient(MONGODB_URI);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const results = await db.collection("movies").find({}).count();


    if (results) {
      console.info("deleting collection");
      await db.collection("movies").drop();
    }

    const data = await fs.readFile(path.join(__dirname, "data.json"), "utf8");
    await db.collection("movies").insertMany(JSON.parse(data));

      console.info(
        "Movie Database created"
      );

    // User Database
    const results2 = await db.collection("users").find({}).count();


    if (results2) {
      console.info("deleting collection");
      await db.collection("users").drop();
    }

    const data2 = await fs.readFile(path.join(__dirname, "userData.json"), "utf8");
    await db.collection("users").insertMany(JSON.parse(data2));

      console.info(
        "User Database created"
      );
    
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main();
