import express from 'express';
import { searchCourses } from '../controllers/CoursesController/CoursesController';

const router = express.Router();

router.get('/', searchCourses);

export default router;
