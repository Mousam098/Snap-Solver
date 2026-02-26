require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8900,
  ENV: process.env.NODE_ENV || 'dev',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/snapsolver',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d'
};