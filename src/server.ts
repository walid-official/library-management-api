import mongoose from 'mongoose';
import { config } from './app/config/db';
import app from './app';

async function main() {
  try {
    if (!config.mongoURI) {
      throw new Error('MongoDB URI not found in environment variables');
    }

    await mongoose.connect(config.mongoURI);
    console.log('Database connected');

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect DB', err);
  }
}

main();
