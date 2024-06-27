import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected");
  } catch (e) {
    console.log("database connection failed");
    console.log(e);
  }
};

export default connectToDatabase;
