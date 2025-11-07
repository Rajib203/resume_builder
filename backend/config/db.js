import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://uddinboka_db_user:resume123@cluster0.7swiges.mongodb.net/Resume")
    .then(() => console.log("✅ MongoDB Connected"))
}