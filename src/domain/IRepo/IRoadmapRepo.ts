import { IRoadmap } from '../entities/IRoadmap';
import { PostRoadmapDTO } from '../DTOs/roadmap/PostRoadmapDTO';
import { PutRoadmapDTO } from '../DTOs/roadmap/PutRoadmapDTO';

export interface IRoadmapRepo {
  create(roadmap: PostRoadmapDTO): Promise<IRoadmap>;
  update(id: number, roadmap: PutRoadmapDTO): Promise<IRoadmap>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<IRoadmap>;
  getAll(): Promise<IRoadmap[]>;
}