import { IRoadmap } from '../entities/IRoadmap';
import { PostRoadmapDTO } from '../DTOs/roadmap/PostRoadmapDTO';
import { PutRoadmapDTO } from '../DTOs/roadmap/PutRoadmapDTO';
import { GetRoadmapDTO } from '../DTOs/roadmap/GetRoadmapDTO';

export interface IRoadmapRepo {
  create(roadmap: IRoadmap): Promise<IRoadmap>;
  update(slug: string, roadmap: PutRoadmapDTO): Promise<IRoadmap>;
  delete(slug: string): Promise<void>;
  getBySlug(slug: string): Promise<IRoadmap>;
  getById(id: number): Promise<IRoadmap>;
  getAll(...args: any): Promise<GetRoadmapDTO[]>;
  getFollowed(userId: number, ...args: any): Promise<IRoadmap[]>
  getByCreator(userId: number, ...args: any): Promise<IRoadmap[]>
  count(...args: any): Promise<number>
  getId(slug: string): Promise<number>
}