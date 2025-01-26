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
import { IFollowRepo } from '../../domain/IRepo/IFollowRepo';
import { FollowRepo } from '../../infrastructure/repos/FollowRepo';

const router = Router();

// * Repos (DI)
const repo: IRoadmapRepo = RoadmapRepo.instance;
const topicRepo: ITopicRepo = TopicRepo.instance;
const edgeRepo: IEdgeRepo = EdgeRepo.instance;
const resourceRepo: IResourceRepo = ResourceRepo.instance;
const followRepo: IFollowRepo = FollowRepo.instance;

const service = new RoadmapService(
  repo,
  topicRepo,
  edgeRepo,
  resourceRepo,
  followRepo,
);
const controller = new RoadmapController(service);

// *******************************
// *******      GET      *********
// *******************************

router.get('/', authenticate(false), controller.getAll.bind(controller)); // get roadmap list

router.get(
  '/:slug',
  authenticate(false),
  controller.getBySlug.bind(controller),
);

router.get('/check-slug/:slug', controller.slug.bind(controller));

router.get('/resources/:slug', controller.getResources.bind(controller));

// *******************************
// *******      POST      ********
// *******************************

/**
 * Create a new roadmap
 */
router.post(
  '/',
  notEmpty('title', 'description', 'slug', 'icon'),
  authenticate(),
  allowedTokens(),
  controller.create.bind(controller),
);

router.post(
  '/generated',
  notEmpty('title', 'description', 'icon'),
  authenticate(),
  allowedTokens(),
  controller.createGenerated.bind(controller),
);

router.post(
  '/generated-data/:slug',
  authenticate(),
  allowedTokens(),
  controller.putRoadmapData.bind(controller),
);

/**
 * publish / hide a roadmap
 */
router.post(
  '/publish/:slug',
  authenticate(),
  allowedTokens(),
  editorPermission,
  controller.publish.bind(controller),
);

/**
 * follow a roadmap
 */
router.post(
  '/follow/:slug',
  authenticate(),
  allowedTokens(),
  controller.follow.bind(controller),
);

// *******************************
// ********      PUT      ********
// *******************************

/**
 * update roadmap resources
 */
router.put(
  '/resources/',
  authenticate(),
  allowedTokens(),
  editorPermission,
  controller.editResources.bind(controller),
);

/**
 * Update roadmap data
 */
router.put(
  '/:slug',
  authenticate(),
  allowedTokens(),
  editorPermission,
  controller.update.bind(controller),
);

/**
 * update roadmap data (Topics and Edges)
 */
router.put(
  '/data/:slug',
  authenticate(),
  allowedTokens(),
  editorPermission,
  controller.putRoadmapData.bind(controller),
);

export default router;
