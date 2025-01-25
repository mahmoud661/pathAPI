import { Router } from 'express';
import { authenticate } from '../middlewares/auth.guard';
import allowedTokens from '../middlewares/allowedTokens.guard';
import { TopicRepo } from '../../infrastructure/repos/TopicRepo';
import { ITopicRepo } from '../../domain/IRepo/ITopicRepo';
import { TopicService } from '../../application/service/topic.service';
import { TopicController } from '../controllers/topic.controller';

const router = Router();

const repo: ITopicRepo = TopicRepo.instance;
const service = new TopicService(repo);
const controller = new TopicController(service);

/**
 * Get all topics (enum)
 */
router.get('/', controller.get.bind(controller));

/**
 * Get achieved
 */
router.get('/achieved', authenticate(), allowedTokens(), controller.getAchieved.bind(controller));

/**
 * Achieve a topic
 * @param {number} topicId
 *
 */
router.post(
  '/achieve/:id',
  authenticate(),
  allowedTokens(),
  controller.achieve.bind(controller),
);

export default router;