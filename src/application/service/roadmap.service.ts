import { PostRoadmapDTO } from '../../domain/DTOs/roadmap/PostRoadmapDTO';
import { PutRoadmapDTO } from '../../domain/DTOs/roadmap/PutRoadmapDTO';
import { IEdge } from '../../domain/entities/IEdge';
import { IRoadmap } from '../../domain/entities/IRoadmap';
import { ITopic } from '../../domain/entities/ITopic';
import { IEdgeRepo } from '../../domain/IRepo/IEdgeRepo';
import { IRoadmapRepo } from '../../domain/IRepo/IRoadmapRepo';
import { ITopicRepo } from '../../domain/IRepo/ITopicRepo';
import Logger from '../../infrastructure/logger/consoleLogger';
import { CustomError } from '../exception/customError';

export class RoadmapService {
  constructor(
    private _repo: IRoadmapRepo,
    private _topicRepo: ITopicRepo,
    private _edgeRepo: IEdgeRepo,
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

  async update(id: number, putRoadmap: PutRoadmapDTO, userId: number) {
    const roadmap = await this._repo.getById(id);
    if (!roadmap) {
      throw new CustomError('Roadmap not found', 404);
    }
    if (!roadmap.is_official || userId !== roadmap.creator) {
      throw new CustomError('Not authorized', 403);
    }
    return await this._repo.update(id, putRoadmap);
  }

  async delete(id: number) {
    await this._repo.delete(id);
  }

  async getById(id: number) {
    const roadmap = await this._repo.getById(id);
    const topics = await this._topicRepo.getByRoadmap(id);
    const edges = await this._edgeRepo.getByRoadmap(id);
    return { ...roadmap, topics, edges };
  }

  async getAll() {
    return await this._repo.getAll();
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
}
