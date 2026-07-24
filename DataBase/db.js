import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const MONGOOSE_URI = process.env.MONGOOSE_URI;
    await mongoose.connect(MONGOOSE_URI);
    console.log("MongoDB connected successfully!.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // don't run server without a DB
  }
};

export default ConnectDB;
