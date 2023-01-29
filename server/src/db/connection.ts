import mongoose from "mongoose";
import config from "../config";

export default async () => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(config.dbString);

    console.log("Connected to DB ✅");
  } catch (error) {
    console.log("Cannot connect to DB: ", error);
  }
};
