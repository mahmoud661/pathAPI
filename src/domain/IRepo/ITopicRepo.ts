import { ITopic } from '../entities/ITopic';

export interface ITopicRepo {
  create(topic: ITopic[], roadmapId: number): Promise<void>;
  delete(roadmapId: number): Promise<void>;
  getByRoadmap(roadmapId: number): Promise<ITopic[]>;
}