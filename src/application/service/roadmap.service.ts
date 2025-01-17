import { PostRoadmapDTO } from '../../domain/DTOs/roadmap/PostRoadmapDTO';
import { PutRoadmapDTO } from '../../domain/DTOs/roadmap/PutRoadmapDTO';
import { IRoadmapRepo } from '../../domain/IRepo/IRoadmapRepo';
import { CustomError } from '../exception/customError';

export class RoadmapService {
  constructor(private _repo: IRoadmapRepo) {}

  async create(postRoadmap: PostRoadmapDTO) {
    if (!postRoadmap.title || !postRoadmap.description) {
      throw new CustomError('Title and description are required', 400);
    }
    return await this._repo.create(postRoadmap);
  }

  async update(id: number, putRoadmap: PutRoadmapDTO) {
    return await this._repo.update(id, putRoadmap);
  }

  async delete(id: number) {
    await this._repo.delete(id);
  }

  async getById(id: number) {
    return await this._repo.getById(id);
  }

  async getAll() {
    return await this._repo.getAll();
  }
}