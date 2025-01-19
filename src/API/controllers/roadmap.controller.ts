import { Request, Response, NextFunction } from 'express';
import { RoadmapService } from '../../application/service/roadmap.service';
import { CustomError } from '../../application/exception/customError';
import AuthenticatedRequest from '../types/AuthenticatedRequest';
import { PutRoadmapDTO } from '../../domain/DTOs/roadmap/PutRoadmapDTO';
import Logger from '../../infrastructure/logger/consoleLogger';

export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { user, isEditor, body } = req;
    const postedRoadmap = { ...body };
    try {
      const roadmap = await this.roadmapService.create(
        postedRoadmap,
        user.id,
        isEditor ?? false,
      );
      res.status(201).json({ success: true, roadmap });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    if (isNaN(id))
      res
        .status(400)
        .send({ success: false, message: 'Invalid id, id must be a number' });

    const putRoadmap: PutRoadmapDTO = { ...req.body };

    try {
      const roadmap = await this.roadmapService.update(
        id,
        putRoadmap,
        req.user.id,
      );
      res.status(200).json({ success: true, roadmap });
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
      const roadmap = await this.roadmapService.getById(
        parseInt(req.params.id),
      );
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

  async slug(req: Request, res: Response, next: NextFunction) {
    const { slug } = req.params;
    try {
      await this.roadmapService.checkSlugAvailability(slug);
      res.status(200).json({ success: true, message: 'Available.' });
    } catch (error) {
      next(error);
    }
  }
}
