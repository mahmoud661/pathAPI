import { PostRoadmapDTO } from '../../domain/DTOs/roadmap/PostRoadmapDTO';
import { PutRoadmapDTO } from '../../domain/DTOs/roadmap/PutRoadmapDTO';
import { IEdge } from '../../domain/entities/IEdge';
import { IResource } from '../../domain/entities/IResource';
import { IRoadmap } from '../../domain/entities/IRoadmap';
import { ITopic } from '../../domain/entities/ITopic';
import { IEdgeRepo } from '../../domain/IRepo/IEdgeRepo';
import { IResourceRepo } from '../../domain/IRepo/IResoureRepo';
import { IRoadmapRepo } from '../../domain/IRepo/IRoadmapRepo';
import { ITopicRepo } from '../../domain/IRepo/ITopicRepo';
import Logger from '../../infrastructure/logger/consoleLogger';
import { CustomError } from '../exception/customError';

export class RoadmapService {
  constructor(
    private _repo: IRoadmapRepo,
    private _topicRepo: ITopicRepo,
    private _edgeRepo: IEdgeRepo,
    private _resourceRepo: IResourceRepo,
  ) {}

  async create(
    postRoadmap: PostRoadmapDTO,
    user_id: number,
    is_editor: boolean,
  ) {
    await this.checkSlugAvailability(postRoadmap.slug);
    const newRoadmap: IRoadmap = {
      ...postRoadmap,
      id: 0,
      creator: user_id,
      is_official: is_editor,
      visibility: is_editor ? 'hidden' : 'private',
    };
    return await this._repo.create(newRoadmap);
  }

  async update(slug: string, putRoadmap: PutRoadmapDTO, userId: number) {
    const roadmap = await this._repo.getBySlug(slug);
    if (!roadmap) {
      throw new CustomError('Roadmap not found', 404);
    }
    if (!roadmap.is_official || userId !== roadmap.creator) {
      throw new CustomError('Not authorized', 403);
    }
    return await this._repo.update(slug, putRoadmap);
  }

  async delete(slug: string) {
    await this._repo.delete(slug);
  }

  async getBySlug(slug: string, userId: number) {
    const roadmap = await this._repo.getBySlug(slug);
    const roadmapId = roadmap.id;
    const topics = await this._topicRepo.getByRoadmap(roadmapId);
    const edges = await this._edgeRepo.getByRoadmap(roadmapId);
    const resources = await this._resourceRepo.getByRoadmap(roadmapId);

    return { ...roadmap, topics, edges, resources };
  }

  async getAll(userId: number, isEditor: boolean) {
    const userRoadmaps = userId ? await this._repo.getFollowed(userId) : [];
    const createdRoadmaps = isEditor
      ? await this._repo.getByCreator(userId)
      : [];
    const roadmaps = await this._repo.getAll();
    const response = {
      roadmaps,
      userRoadmaps,
      createdRoadmaps,
    };
    return await response;
  }

  async checkSlugAvailability(slug: string): Promise<void> {
    const roadmap = await this._repo.getBySlug(slug);
    if (roadmap) {
      throw new CustomError('Slug is not available', 409);
    }
    return;
  }

  async updateData(roadmapId: number, topics: ITopic[], edges: IEdge[]) {
    await this._edgeRepo.delete(roadmapId);
    await this._topicRepo.delete(roadmapId);
    await this._topicRepo.create(topics, roadmapId);
    await this._edgeRepo.create(edges, roadmapId);
  }

  async editResources(roadmapId: number, resources: IResource[]) {}

  async updateVisibility(slug: string, userId: number): Promise<IRoadmap> {
    const roadmap = await this._repo.getBySlug(slug);
    if (!roadmap) {
      throw new CustomError('Roadmap not found', 404);
    }
    if (!roadmap.is_official || roadmap.creator !== userId) {
      throw new CustomError('not authorized', 403);
    }
    const putRoadmap: PutRoadmapDTO = {
      visibility: roadmap.visibility === 'public' ? 'hidden' : 'public',
    };
    return await this._repo.update(slug, putRoadmap);
  }
}
