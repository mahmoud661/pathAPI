import { IRoadmap } from '../entities/IRoadmap';
import { PostRoadmapDTO } from '../DTOs/roadmap/PostRoadmapDTO';
import { PutRoadmapDTO } from '../DTOs/roadmap/PutRoadmapDTO';

export interface IRoadmapRepo {
  create(roadmap: IRoadmap): Promise<IRoadmap>;
  update(slug: string, roadmap: PutRoadmapDTO): Promise<IRoadmap>;
  delete(slug: string): Promise<void>;
  getBySlug(slug: string): Promise<IRoadmap>;
  getAll(): Promise<IRoadmap[]>;
  getFollowed(userId: number): Promise<IRoadmap[]>
  getByCreator(userId: number): Promise<IRoadmap[]>
}