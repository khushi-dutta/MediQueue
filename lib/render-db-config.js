/**
 * Configure Prisma to use SQLite
 * This script ensures compatibility for both development and production
 */

console.log('Configuring SQLite database connection...');

// Check if DATABASE_URL is already set
if (process.env.DATABASE_URL) {
  console.log(`Using DATABASE_URL from environment variables: ${process.env.DATABASE_URL.substring(0, 20)}`);
  // Already set up correctly, no parsing needed
} 
// Default fallback for local development
else {
  console.log('DATABASE_URL not found, using default SQLite path');
  process.env.DATABASE_URL = 'file:./prisma/dev.db';
}

// Ensure the path is accessible
if (process.env.DATABASE_URL.startsWith('file:')) {
  console.log('Using SQLite database file');
}

// Log database configuration status
console.log('Database configuration completed');
