import mongoose from 'mongoose';
import { config } from './config';
import app from './app';

async function main() {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('✅ Database connected');

    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect DB', err);
  }
}

main();
