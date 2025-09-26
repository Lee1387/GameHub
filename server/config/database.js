import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "gamehub",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
    console.log(`📄 Database: ${conn.connection.name}`);

    await createIndexes();
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    const db = mongoose.connection.db;
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    await db.collection("users").createIndex({ username: 1 }, { unique: true });
    await db.collection("users").createIndex({ passwordResetToken: 1 });
    await db.collection("users").createIndex({ passwordResetExpires: 1 });
    await db
      .collection("users")
      .createIndex({ "passwordHistory.createdAt": 1 });
  } catch (error) {
    console.error("⚠️ Index creation failed:", error.message);
  }
};

export default connectDB;
