import { Router } from 'express';
import { RoadmapController } from '../controllers/roadmap.controller';
import { RoadmapService } from '../../application/service/roadmap.service';
import { RoadmapRepo } from '../../infrastructure/repos/RoadmapRepo';
import { authenticate } from '../middlewares/authentication';
import notEmpty from '../middlewares/notEmpty';
import allowedTokens from '../middlewares/allowedTokens.guard';
import { editorPermission } from '../middlewares/editorPermission.guard';
import { TopicRepo } from '../../infrastructure/repos/TopicRepo';
import { ITopicRepo } from '../../domain/IRepo/ITopicRepo';
import { IEdgeRepo } from '../../domain/IRepo/IEdgeRepo';
import { EdgeRepo } from '../../infrastructure/repos/EdgeRepo';
import { IRoadmapRepo } from '../../domain/IRepo/IRoadmapRepo';

const router = Router();

const repo: IRoadmapRepo = RoadmapRepo.instance;
const topicRepo: ITopicRepo = TopicRepo.instance;
const edgeRepo: IEdgeRepo = EdgeRepo.instance;
const service = new RoadmapService(repo, topicRepo, edgeRepo);
const controller = new RoadmapController(service);

router.post(
  '/',
  notEmpty('title', 'description', 'slug', 'icon'),
  authenticate,
  allowedTokens(),
  controller.create.bind(controller),
);

router.put(
  '/:id',
  authenticate,
  allowedTokens(),
  editorPermission,
  controller.update.bind(controller),
);

router.get('/check-slug/:slug', controller.slug.bind(controller));

router.patch(
  '/:id',
  authenticate,
  allowedTokens(),
  editorPermission,
  controller.patch.bind(controller),
);

router.delete('/:id', authenticate, controller.delete.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.get('/', controller.getAll.bind(controller));

export default router;
