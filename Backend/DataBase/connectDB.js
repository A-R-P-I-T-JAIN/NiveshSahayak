import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const databaseInstance = await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("Error connecting to database: from DataBase File", error);
  }
}
