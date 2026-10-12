import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer: MongoMemoryServer | null = null;

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/toyverse';

  try {
    // Attempt connecting to the configured URI with a 3.5s timeout
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3500,
    });
    console.log(`[MongoDB] Connected successfully to ${mongoose.connection.host}`);
  } catch (error: any) {
    console.warn(`[MongoDB] Local connection to ${uri} failed: ${error.message}`);
    console.log(`[MongoDB] Starting fallback in-memory MongoDB server for seamless demo...`);

    try {
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(`[MongoDB] Connected to in-memory MongoDB at ${memoryUri}`);

      // Auto-trigger seed in in-memory mode if products are empty
      const { Product } = await import('../models/Product');
      const count = await Product.countDocuments();
      if (count === 0) {
        const { seedDatabase } = await import('../seed/seedData');
        await seedDatabase();
      }
    } catch (memErr: any) {
      console.error(`[MongoDB] Failed to start in-memory server: ${memErr.message}`);
      process.exit(1);
    }
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
};
