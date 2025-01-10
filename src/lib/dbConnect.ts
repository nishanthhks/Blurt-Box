import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Using existing connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL || "", {});

    connection.isConnected = db.connections[0].readyState;
    console.log("New connection created");
  } catch (error) {
    console.log("Error connecting to database: ", error);
    process.exit(1);
  }
};

export default dbConnect;
