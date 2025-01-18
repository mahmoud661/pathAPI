import { Router } from 'express';
import { RoadmapController } from '../controllers/roadmap.controller';
import { RoadmapService } from '../../application/service/roadmap.service';
import { RoadmapRepo } from '../../infrastructure/repos/RoadmapRepo';
import { authenticate } from '../middlewares/authentication';
import notEmpty from '../middlewares/notEmpty';
import allowedTokens from '../middlewares/allowedTokens.middleware';

const router = Router();

const repo = RoadmapRepo.instance;
const service = new RoadmapService(repo);
const controller = new RoadmapController(service);

router.post(
  '/',
  authenticate,
  allowedTokens(),
  notEmpty('title', 'description', 'slug', 'icon'),
  controller.create,
);

router.put(
  '/:id',
  authenticate,
  controller.update.bind(controller),
);

router.delete(
  '/:id',
  authenticate,
  controller.delete.bind(controller),
);

router.get('/check-slug/:slug', controller.slug);

router.get('/:id', controller.getById.bind(controller));
router.get('/', controller.getAll.bind(controller));

export default router;
