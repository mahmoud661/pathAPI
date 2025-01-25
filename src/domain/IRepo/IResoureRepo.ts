import { IResource } from '../entities/IResource';

export interface IResourceRepo {
  create(resource: IResource[]): Promise<IResource[]>;
  delete(roadmap: number): Promise<void>;
  getByRoadmap(roadmap: number): Promise<IResource[]>;
}
