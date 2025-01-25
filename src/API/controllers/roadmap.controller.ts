import { Request, Response, NextFunction } from 'express';
import { RoadmapService } from '../../application/service/roadmap.service';
import { CustomError } from '../../application/exception/customError';
import AuthenticatedRequest from '../types/AuthenticatedRequest';
import { PutRoadmapDTO } from '../../domain/DTOs/roadmap/PutRoadmapDTO';
import Logger from '../../infrastructure/logger/consoleLogger';
import { IPatchBody } from '../types/roadmapsRequests';

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
    const slug = req.params.slug;

    const putRoadmap: PutRoadmapDTO = { ...req.body };

    try {
      const roadmap = await this.roadmapService.update(
        slug,
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
      await this.roadmapService.delete(req.params.string);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getBySlug(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    const slug = req.params.slug;
    const user = req.user;

    try {
      const roadmap = await this.roadmapService.getBySlug(
        slug,
        (user && user.id) || 0,
      );
      res.status(200).json({ success: true, roadmap });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { user, isEditor } = req;
    const { page = 1, limit = 1000 } = req.query;
    Logger.Debug(`user id: ${user?.id} request all roadmaps`);

    try {
      const roadmaps = await this.roadmapService.getAll(
        (user && user.id) || 0,
        isEditor!,
        page as number,  // TODO: Safety check
        limit as number,
      );
      res.status(200).json({ success: true, data: roadmaps });
    } catch (error) {
      next(error);
    }
  }

  async patch(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    if (isNaN(id))
      res
        .status(400)
        .send({ success: false, message: 'Invalid id, id must be a number' });

    const { topics, edges } = req.body as IPatchBody;
    try {
      await this.roadmapService.updateData(id, topics, edges);
      res.status(200).send({ success: true });
    } catch (error) {
      next(error);
      return;
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
  async editResources(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {}

  async publish(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const slug = req.params.slug;
    const { user } = req;

    try {
      const roadmap = await this.roadmapService.updateVisibility(slug, user.id);
      res.status(200).json({ success: true, roadmap });
    } catch (error) {
      next(error);
    }
  }

  async follow(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const slug = req.params.slug;
    const { user } = req;

    try {
      const roadmap = await this.roadmapService.follow(slug, user.id);
      res.status(200).json({ success: true, roadmap });
    } catch (error) {
      next(error);
    }
  }
}
