import { NextFunction, Response } from 'express';
import AuthenticatedRequest from '../types/AuthenticatedRequest';
import Logger from '../../infrastructure/logger/consoleLogger';

export class TopicController {
  constructor(private topicService: any) {}

  async get(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const topics = await this.topicService.get();
      res.status(200).send({ success: true, topics });
    } catch (error) {
      next(error);
      return;
    }
  }

  async getAchieved(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    Logger.Debug('req' + req);
    Logger.Debug('user: ' + req.user);
    try {
      const topics = await this.topicService.getAchieved(req.user.id);
      res.status(200).send({ success: true, topics });
    } catch (error) {
      next(error);
      return;
    }
  }

  async achieve(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      await this.topicService.achieve(req.params.id, req.user.id);
      res.status(200).send({ success: true });
    } catch (error: Error | any) {
      next(error);
      return;
    }
  }

  async getSkills(req: AuthenticatedRequest, res: Response,  next: NextFunction) {
    try {
      const skills = await this.topicService.getSkills();
      res.status(200).send({ success: true, skills });
    } catch (error) {
      next(error);
      return;
    }
  }
}
