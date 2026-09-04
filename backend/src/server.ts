import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';

const PORT = Number(process.env.PORT) || 5000;
const app = createApp();

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 1Fi EMI Store API running on port ${PORT}`);
  console.log(`📡 Health endpoint: http://0.0.0.0:${PORT}/api/health`);
  console.log(`📱 Products endpoint: http://0.0.0.0:${PORT}/api/products`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

export default server;
