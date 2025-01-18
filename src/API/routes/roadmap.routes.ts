import { Router } from 'express';
import { RoadmapController } from '../controllers/roadmap.controller';
import { RoadmapService } from '../../application/service/roadmap.service';
import { RoadmapRepo } from '../../infrastructure/repos/RoadmapRepo';
import { authenticate } from '../middlewares/authentication';
import notEmpty from '../middlewares/notEmpty';

const router = Router();

const roadmapRepo = RoadmapRepo.instance;
const roadmapService = new RoadmapService(roadmapRepo);
const roadmapController = new RoadmapController(roadmapService);

router.post(
  '/',
  authenticate,
  notEmpty('title', 'description' , 'slug'),
  roadmapController.create.bind(roadmapController),
);

router.put(
  '/:id',
  authenticate,
  roadmapController.update.bind(roadmapController),
);

router.delete(
  '/:id',
  authenticate,
  roadmapController.delete.bind(roadmapController),
);

router.get('/:id', roadmapController.getById.bind(roadmapController));
router.get('/', roadmapController.getAll.bind(roadmapController));

export default router;