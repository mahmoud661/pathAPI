import { ErrorHandler } from 'postmark/dist/client/errors/ErrorHandler';
import coursesRoute from './API/routes/CoursesRoute';

import express from 'express';
import errorMiddleware from './API/middlewares/error';


const app = express();
const port = 4000;

app.use(express.json());
app.use(errorMiddleware);

// app.use('/auth', authRoute);
app.use('/courses', coursesRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
