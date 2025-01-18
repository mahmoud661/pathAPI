import { ErrorHandler } from 'postmark/dist/client/errors/ErrorHandler';
import coursesRoute from './API/routes/CoursesRoute';
import jobsRoute from './API/routes/JobsRoute';
import roadmapRoute from './API/routes/roadmap.routes';
import profileRoute from './API/routes/profile.routes';
import express from 'express';
import cors from 'cors';
import errorMiddleware from './API/middlewares/error';
import authRoute from './API/routes/auth';
import Logger from './infrastructure/logger/consoleLogger';
import { config } from './config';

const app = express();
let PORT = (config.port as number) || 4000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/courses', coursesRoute);
app.use('/jobs', jobsRoute);
app.use('/roadmaps', roadmapRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  Logger.Success(`\x1b[32mServer is running at http://localhost:${PORT}`);
});