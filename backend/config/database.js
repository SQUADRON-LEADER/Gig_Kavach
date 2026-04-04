import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

let connectPromise = null;

export async function connectDatabase() {
  if (!MONGO_URI) {
    return null;
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectPromise) {
    connectPromise = mongoose.connect(MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME || undefined,
    });
  }

  const connection = await connectPromise;
  return connection.connection;
}

export function hasDatabaseUri() {
  return Boolean(MONGO_URI);
}