// server.js
const { PORT } = require('./config/env');
const connectDB = require('./utils/database');
const app = require('./app');

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();

