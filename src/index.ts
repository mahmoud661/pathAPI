import { ErrorHandler } from 'postmark/dist/client/errors/ErrorHandler';
import coursesRoute from './API/routes/course.routes';
import jobsRoute from './API/routes/jobs.routes';
import roadmapRoute from './API/routes/roadmap.routes';
import profileRoute from './API/routes/profile.routes';
import express from 'express';
import cors from 'cors';
import errorMiddleware from './API/middlewares/error.middleware';
import authRoute from './API/routes/auth.routes';
import Logger from './infrastructure/logger/consoleLogger';
import { config } from './config';
import topicRoute from './API/routes/topic.routes';

const app = express();
let PORT = (config.port as number) || 4000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/courses', coursesRoute);
app.use('/jobs', jobsRoute);
app.use('/roadmaps', roadmapRoute);
app.use('/topics', topicRoute)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.clear();
  Logger.Success(`\x1b[32mServer is running at http://localhost:${PORT}`);
});