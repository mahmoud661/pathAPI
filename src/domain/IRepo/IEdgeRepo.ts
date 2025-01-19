import { IEdge } from '../entities/IEdge';

export interface IEdgeRepo {
  create(topic: IEdge[], roadmapId: number): Promise<void>;
  delete(id: number): Promise<void>;
  getByRoadmap(roadmapId: number): Promise<IEdge[]>;
}
