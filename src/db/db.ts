import mongoose, { ConnectOptions } from "mongoose";

const DB_NAME = "expressTScoffeeshop";
export const connectDB = async () => {
  try {
    const connectionResponse = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      "Database connected successfully",
      connectionResponse.connection.host
    );
  } catch (error) {
    console.log("Error connecting database ", error);
    process.exit(1);
  }
};
