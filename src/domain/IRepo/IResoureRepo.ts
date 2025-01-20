;
import { IResource } from '../entities/IResource';

export interface IResourceRepo {
  create(resource: IResource[]): Promise<IResource[]>;
  delete(id: string): Promise<void>;
  getByRoadmap(roadmapId: number): Promise<IResource[]>;
}
