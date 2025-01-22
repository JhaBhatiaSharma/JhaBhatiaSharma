const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const rateLimiter = require('./app/middlewares/rateLimiter');
const authMiddleware = require('./app/middlewares/jwtMiddleware');

const healthRouter = require('./app/routes/healthRoute');
const userRouter = require('./app/routes/userRoute');
const internshipRouter = require('./app/routes/internshipRoute');
const interviewRouter = require('./app/routes/interviewRoute');
const resumeRouter = require('./app/routes/resumeRoute');

const app = express();
const port = process.env.PORT || 8000;
const host = process.env.HOST || '0.0.0.0';

app.use(helmet());
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());
app.use(rateLimiter);

app.use('/api/v1', healthRouter);
app.use('/api/v1', userRouter);
app.use(authMiddleware);
app.use(internshipRouter);
app.use(interviewRouter);
app.use(resumeRouter)

app.listen(port, host, () => {
  console.log("STARTING BACKEND SERVER");
  console.log("ENV: ", process.env.ENVIRONMENT);
  console.log(`Server listening on http://${host}:${port}`);
});

module.exports = app; 