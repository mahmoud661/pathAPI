import { Router } from 'express';
import { RoadmapController } from '../controllers/roadmap.controller';
import { RoadmapService } from '../../application/service/roadmap.service';
import { RoadmapRepo } from '../../infrastructure/repos/RoadmapRepo';
import { authenticate } from '../middlewares/auth.guard';
import notEmpty from '../middlewares/data.guard';
import allowedTokens from '../middlewares/allowedTokens.guard';
import { editorPermission } from '../middlewares/editorPermission.guard';
import { TopicRepo } from '../../infrastructure/repos/TopicRepo';
import { ITopicRepo } from '../../domain/IRepo/ITopicRepo';
import { IEdgeRepo } from '../../domain/IRepo/IEdgeRepo';
import { EdgeRepo } from '../../infrastructure/repos/EdgeRepo';
import { IRoadmapRepo } from '../../domain/IRepo/IRoadmapRepo';
import { IResourceRepo } from '../../domain/IRepo/IResoureRepo';
import { ResourceRepo } from '../../infrastructure/repos/ResourceRepo';

const router = Router();

const repo: IRoadmapRepo = RoadmapRepo.instance;
const topicRepo: ITopicRepo = TopicRepo.instance;
const edgeRepo: IEdgeRepo = EdgeRepo.instance;
const resourceRepo: IResourceRepo = ResourceRepo.instance;
const service = new RoadmapService(repo, topicRepo, edgeRepo, resourceRepo);
const controller = new RoadmapController(service);

router.post(
  // Create a new roadmap
  '/',
  notEmpty('title', 'description', 'slug', 'icon'),
  authenticate(),
  allowedTokens(),
  controller.create.bind(controller),
);

router.put(
  // Update roadmap data
  '/:id',
  authenticate(),
  allowedTokens(),
  editorPermission,
  controller.update.bind(controller),
);

router.patch(
  // update roadmap topics and edges
  '/:id',
  authenticate(),
  allowedTokens(),
  editorPermission,
  controller.patch.bind(controller),
);

router.get(
  // Get roadmap by slug
  '/:slug',
  authenticate(false),
  controller.getBySlug.bind(controller),
);

router.post(
  '/publish/:id',
  authenticate(),
  allowedTokens(),
  editorPermission,
  controller.publish.bind(controller),
);

router.get('/check-slug/:slug', controller.slug.bind(controller));

router.get('/', authenticate(false), controller.getAll.bind(controller));

router.put('/resources/:id', controller.editResources.bind(controller));

export default router;
