import { Router } from 'express';
import { CoursesController } from '../controllers/courses.controller';
import CoursesService from '../../infrastructure/CoursesService/CoursesService.service';

const router = Router();
const coursesController = new CoursesController(CoursesService.instance);

router.get('/', coursesController.searchCourses);

export default router;
