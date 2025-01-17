import { Request, Response, NextFunction } from 'express';
import { RoadmapService } from '../../application/service/roadmap.service';
import { CustomError } from '../../application/exception/customError';
import AuthenticatedRequest from '../types/AuthenticatedRequest';

export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const {user, isEditor, body} = req;
    if (!req.user.is_editor) {
      throw new CustomError('Not authorized', 403);
    }
    try {
      const roadmap = await this.roadmapService.create(req.body);
      res.status(201).json({ success: true, roadmap });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user.is_editor) {
        throw new CustomError('Not authorized', 403);
      }
      const roadmap = await this.roadmapService.update(
        parseInt(req.params.id),
        req.body,
      );
      res.status(200).json({ success: true, data: roadmap });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user.is_editor) {
        throw new CustomError('Not authorized', 403);
      }
      await this.roadmapService.delete(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const roadmap = await this.roadmapService.getById(parseInt(req.params.id));
      res.status(200).json({ success: true, data: roadmap });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const roadmaps = await this.roadmapService.getAll();
      res.status(200).json({ success: true, data: roadmaps });
    } catch (error) {
      next(error);
    }
  }
}