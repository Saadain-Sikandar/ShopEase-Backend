import mongoose from "mongoose";

let isConnected = false;
const ConnectDB = async () => {
  if (isConnected) return;
  try {
    const MONGOOSE_URI = process.env.MONGOOSE_URI;
    const db = await mongoose.connect(MONGOOSE_URI);
    isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully!.");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
   // process.exit(1); // don't run server without a DB
  }
};

export default ConnectDB;
