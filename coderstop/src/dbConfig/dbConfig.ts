import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

export async function connect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already Connected to the database");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI! || "", {});
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error Please make sure database is up and running",
        err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something Went Wrong", error);
    process.exit(1);
  }
}
