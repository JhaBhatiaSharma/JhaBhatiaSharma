const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const initializeConfigurations = require('./app/utils/v2/initialConfiguration');
const connectDB = require('./db/v2/database');

const rateLimiter = require('./app/middlewares/v1/rateLimiter');
//const authMiddleware = require('./app/middlewares/v1/jwtMiddleware');
const errorHandler = require('./app/middlewares/v2/errorHandler');
const logUsage = require('./app/middlewares/v2/logUsage');

const healthRouter = require('./app/routes/healthRoute');
const userRouter = require('./app/routes/v1/userRoute');
// const internshipRouter = require('./app/routes/v1/internshipRoute');
// const interviewRouter = require('./app/routes/v1/interviewRoute');
// const resumeRouter = require('./app/routes/v1/resumeRoute');
const authRoutes = require('./app/routes/v2/authRoutes');
const internshipRoutes = require('./app/routes/v2/internshipRoutes');
const userRoutes = require('./app/routes/v2/userRoutes');
const messagingRoutes = require('./app/routes/v2/messagingRoutes');
const cvRoutes = require('./app/routes/v2/cvRoutes');
const recommendationRoutes = require('./app/routes/v2/recommendationRoutes');
const adminRoutes = require('./app/routes/v2/adminRoutes');
const complaintRoutes = require('./app/routes/v2/complaintRoutes');
const reportRoutes = require('./app/routes/v2/reportRoutes');
const configurationRoutes = require('./app/routes/v2/configurationRoutes');

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

app.use(helmet());
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());
app.use(rateLimiter);
app.use(errorHandler);

initializeConfigurations();

app.use('/api/v1', healthRouter);
app.use('/api/v1', userRouter);
//Commented since v1 routes used different authentication middleware
//app.use(authMiddleware);
// app.use('/api/v1', internshipRouter);
// app.use('/api/v1', interviewRouter);
// app.use('/api/v1', resumeRouter);
app.use('/api/v2', logUsage);
app.use('/api/v2/auth', authRoutes);
app.use('/api/v2/internships', internshipRoutes);
app.use('/api/v2/users', userRoutes);
app.use('/api/v2/cv', cvRoutes);
app.use('/api/v2/recommendations', recommendationRoutes);
app.use('/api/v2/messaging', messagingRoutes)
app.use('/api/v2/admin',adminRoutes)
app.use('/api/v2/complaints',complaintRoutes)
app.use('/api/v2/reports', reportRoutes)
app.use("/api/v2/configurations", configurationRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, host, () => {
      console.log("STARTING BACKEND SERVER");
      console.log("ENV: ", process.env.ENVIRONMENT);
      console.log(`Server listening on http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

module.exports = app; 
startServer();