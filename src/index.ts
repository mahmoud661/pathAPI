import { ErrorHandler } from 'postmark/dist/client/errors/ErrorHandler';
import coursesRoute from './API/routes/CoursesRoute';
import jobsRoute from './API/routes/JobsRoute';
import express from 'express';
import cors from 'cors';
import errorMiddleware from './API/middlewares/error';
import authRoute from './API/routes/auth';

const app = express();
const port = 4000;

app.use(cors()); // Add CORS middleware
app.use(express.json());
app.use(errorMiddleware);

app.use('/auth', authRoute);
app.use('/courses', coursesRoute);
app.use('/jobs', jobsRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
