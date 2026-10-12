import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/db';
import { seedDatabase } from './seedData';

const run = async () => {
  try {
    await connectDB();
    await seedDatabase();
    console.log('Seed completed successfully!');
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('Seed script encountered error:', error);
    process.exit(1);
  }
};

run();
