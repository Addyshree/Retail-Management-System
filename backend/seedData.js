import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import JSONStream from "jsonstream";
import Sale from "./models/Sale.js";
import dotenv from "dotenv";

dotenv.config();

// ─────────────────────────────── CONFIG ───────────────────────────────
const MAX_RECORDS = 200; // ← Only import 200 documents
const BATCH_SIZE = 1000;
let totalInserted = 0;
let processedCount = 0; // ← Tracks how many we've seen
// ──────────────────────────────────────────────────────────────────────

const importData = async () => {
  try {
    console.log("uri: ", process.env.MONGO_URI);
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not defined in .env");

    await mongoose.connect(uri, {
      dbName: "your_actual_database_name", // ← CHANGE THIS TO YOUR DB NAME
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("MongoDB connected successfully");
    await Sale.deleteMany({});
    console.log("Existing data cleared");

    const filePath = path.resolve("truestate_assignment_dataset.json");
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const stream = fs
      .createReadStream(filePath, { encoding: "utf-8" })
      .pipe(JSONStream.parse("*"));

    let batch = [];

    const flushBatch = async () => {
      if (batch.length === 0) return;
      const currentBatch = batch.splice(0, batch.length);

      const bulkOps = currentBatch.map((doc) => ({
        insertOne: { document: doc },
      }));

      const result = await Sale.collection.bulkWrite(bulkOps, {
        ordered: false,
      });

      totalInserted += result.insertedCount;
      process.stdout.write(
        `\rInserted ${totalInserted.toLocaleString()} records...`
      );
    };

    stream.on("data", (item) => {
      // Stop immediately after 200 records
      if (processedCount >= MAX_RECORDS) {
        stream.destroy();
        return;
      }

      const doc = {
        transactionID: item["Transaction ID"]?.toString(),
        date: item["Date"] ? new Date(item["Date"]) : null,
        customerID: item["Customer ID"]?.toString(),
        customerName: item["Customer Name"]?.toString(),
        phoneNumber: item["Phone Number"]?.toString(),
        gender: item["Gender"]?.toString(),
        age: Number(item["Age"]) || 0,
        customerRegion: item["Customer Region"]?.toString(),
        customerType: item["Customer Type"]?.toString(),
        productID: item["Product ID"]?.toString(),
        productName: item["Product Name"]?.toString(),
        brand: item["Brand"]?.toString(),
        productCategory: item["Product Category"]?.toString(),
        tags: item["Tags"] ? item["Tags"].split(",").map((t) => t.trim()) : [],
        quantity: Number(item["Quantity"]) || 0,
        pricePerUnit: Number(item["Price per Unit"]) || 0,
        discountPercentage: Number(item["Discount Percentage"]) || 0,
        totalAmount: Number(item["Total Amount"]) || 0,
        finalAmount: Number(item["Final Amount"]) || 0,
        paymentMethod: item["Payment Method"]?.toString(),
        orderStatus: item["Order Status"]?.toString(),
        deliveryType: item["Delivery Type"]?.toString(),
        storeID: item["Store ID"]?.toString(),
        storeLocation: item["Store Location"]?.toString(),
        salespersonID: item["Salesperson ID"]?.toString(),
        employeeName: item["Employee Name"]?.toString(),
      };

      Object.keys(doc).forEach(
        (key) => doc[key] === undefined && delete doc[key]
      );

      batch.push(doc);
      processedCount++;

      if (batch.length >= BATCH_SIZE || processedCount >= MAX_RECORDS) {
        stream.pause();
        flushBatch().then(() => {
          if (processedCount >= MAX_RECORDS) {
            stream.destroy();
          } else {
            stream.resume();
          }
        });
      }
    });

    stream.on("end", async () => {
      await flushBatch();
      console.log("\nSeeding completed!");
      console.log(`Total records inserted: ${totalInserted.toLocaleString()}`);
      if (totalInserted >= MAX_RECORDS) {
        console.log(
          `Stopped early — only first ${MAX_RECORDS} records imported as requested.`
        );
      }

      await mongoose.disconnect();
      process.exit(0);
    });

    stream.on("error", (err) => {
      console.error("\nStream error:", err);
      process.exit(1);
    });

    stream.on("close", () => {
      // Ensures we exit even if stream is destroyed early
      if (processedCount >= MAX_RECORDS && totalInserted > 0) {
        console.log(`\nGracefully stopped after ${MAX_RECORDS} records.`);
        mongoose.disconnect();
        process.exit(0);
      }
    });
  } catch (err) {
    console.error("\nFatal error:", err.message || err);
    process.exit(1);
  }
};

importData();
