import coursesRoute from './API/routes/CoursesRoute';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors());  // Add CORS middleware
app.use(express.json());

// app.use('/auth', authRoute);
app.use('/courses', coursesRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
