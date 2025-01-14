import express from 'express';
import { CoursesController } from '../controllers/CoursesController/CoursesController';
import CoursesService from '../../infrastructure/CoursesService/CoursesService.service';

const router = express.Router();
const coursesController = new CoursesController(CoursesService.instance);

router.get('/', coursesController.searchCourses);

export default router;
