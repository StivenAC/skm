require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/database');
const logger = require('./utils/logger.utils');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = process.env.PORT || 8080;

// Ensure upload dirs exist
const uploadDirs = ['uploads', 'uploads/photos', 'uploads/signatures', 'uploads/avatars'];
uploadDirs.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
});

async function start() {
  try {
    // 1. Run Migrations & Seeding (Inside the process to manage memory better)
    if (process.env.NODE_ENV === 'production') {
      logger.info('Running database migrations...');
      try {
        // Run migrations inside the backend directory directly using the Prisma CLI JS build
        const prismaCliPath = path.join(__dirname, '../node_modules/prisma/build/index.js');
        const backendPath = path.join(__dirname, '..');
        execSync(`node ${prismaCliPath} migrate deploy`, { cwd: backendPath, stdio: 'inherit' });
        logger.info('Migrations completed');

        // Run seed script automatically to ensure default users are created
        logger.info('Running database seed...');
        execSync(`node prisma/seed.js`, { cwd: backendPath, stdio: 'inherit' });
        logger.info('Database seed completed');
      } catch (migrationError) {
        logger.error('Migration or Seeding failed, but attempting to start anyway:', migrationError.message);
      }
    }

    // 2. Connect to DB
    await connectDB();

    // 3. Start Listening
    const server = app.listen(PORT, '0.0.0.0', () => {
      logger.info(`SKM Server LIVE on port ${PORT}`);
      logger.info(`Memory Usage: ${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB RSS`);
    });

    // Graceful shutdown
    const shutdown = (signal) => {
      logger.info(`${signal} received. Closing server...`);
      server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
      });
      setTimeout(() => process.exit(1), 5000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (err) {
    logger.error('Fatal error during startup:', err);
    process.exit(1);
  }
}

start();

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
});
